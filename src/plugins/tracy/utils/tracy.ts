import {
  type ArrowFunction,
  type Block,
  type Expression,
  type ExpressionStatement,
  factory,
  type FunctionDeclaration,
  isBlock,
  isCallExpression,
  isCaseClause,
  isDefaultClause,
  isDoStatement,
  isExpression,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isIdentifier,
  isIfStatement,
  isMethodDeclaration,
  isNumericLiteral,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isReturnStatement,
  isStringLiteralLike,
  isSwitchStatement,
  isTryStatement,
  isWhileStatement,
  type MethodDeclaration,
  type Node,
  type NodeArray,
  NodeFlags,
  type ReturnStatement,
  type Statement,
  SyntaxKind,
  type Type,
  type TypeChecker,
} from "typescript";

/**
 * Name of the local that captures a hoisted return expression, so the work it performs is measured
 * inside the enclosing Tracy zone. The `____` prefix keeps it out of user identifier space.
 */
const TRACY_RESULT_IDENTIFIER: string = "____tracyZoneResult";

export function isTraceBeginExpression(node: Node): boolean {
  return (
    isExpressionStatement(node) &&
    isCallExpression(node.expression) &&
    isPropertyAccessExpression(node.expression.expression) &&
    (node.expression.expression.name.escapedText === "ZoneBegin" ||
      node.expression.expression.name.escapedText === "ZoneBeginS" ||
      node.expression.expression.name.escapedText === "ZoneBeginN" ||
      node.expression.expression.name.escapedText === "ZoneBeginNS")
  );
}

export function isTraceEndExpression(node: Node): boolean {
  return (
    isExpressionStatement(node) &&
    isCallExpression(node.expression) &&
    isPropertyAccessExpression(node.expression.expression) &&
    node.expression.expression.name.escapedText === "ZoneEnd"
  );
}

export function createTraceZoneBeginExpression(): ExpressionStatement {
  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(factory.createIdentifier("tracy"), "ZoneBegin"),
      undefined,
      []
    )
  );
}

export function createTraceZoneBeginNExpression(name: string): ExpressionStatement {
  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(factory.createIdentifier("tracy"), "ZoneBeginN"),
      undefined,
      [factory.createStringLiteral(name)]
    )
  );
}

export function createTraceZoneBeginSExpression(name: string): ExpressionStatement {
  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(factory.createIdentifier("tracy"), "ZoneBeginS"),
      undefined,
      [factory.createStringLiteral(name)]
    )
  );
}

export function createTraceZoneEndExpression(): ExpressionStatement {
  return factory.createExpressionStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(factory.createIdentifier("tracy"), "ZoneEnd"),
      undefined,
      []
    )
  );
}

/**
 * Check whether a return expression is free of measurable work - a plain read or a literal.
 * Such returns keep the `ZoneEnd(); return <expression>` order, since hoisting them would only add noise.
 *
 * @param expression - Return expression to check.
 * @returns Whether the expression performs no measurable work.
 */
function isTrivialReturnExpression(expression: Expression): boolean {
  if (isPrefixUnaryExpression(expression) && isNumericLiteral(expression.operand)) {
    return true;
  }

  return (
    isIdentifier(expression) ||
    isStringLiteralLike(expression) ||
    isNumericLiteral(expression) ||
    expression.kind === SyntaxKind.ThisKeyword ||
    expression.kind === SyntaxKind.TrueKeyword ||
    expression.kind === SyntaxKind.FalseKeyword ||
    expression.kind === SyntaxKind.NullKeyword
  );
}

/**
 * Check whether a return expression produces a `LuaMultiReturn` value.
 * Hoisting a multi-return into a single local would truncate it to the first value, so such returns
 * keep the `ZoneEnd(); return <expression>` order and their work stays unmeasured.
 *
 * @param checker - Program type checker.
 * @param expression - Return expression to check.
 * @returns Whether the expression evaluates to a multi-return tuple.
 */
function isMultiReturnExpression(checker: TypeChecker, expression: Expression): boolean {
  const type: Type = checker.getTypeAtLocation(expression);

  return type.aliasSymbol?.name === "LuaMultiReturn" || type.getSymbol()?.name === "LuaMultiReturn";
}

/**
 * Check whether a return statement carries measurable work that can be hoisted into a local
 * so the zone measures it.
 *
 * @param statement - Return statement to check.
 * @param checker - Program type checker.
 * @returns Whether the return expression is hoistable.
 */
function isHoistableReturn(statement: ReturnStatement, checker: TypeChecker): boolean {
  return (
    statement.expression !== undefined &&
    !isTrivialReturnExpression(statement.expression) &&
    !isMultiReturnExpression(checker, statement.expression)
  );
}

/**
 * Build the zone-closing replacement for a return statement.
 *
 * Returns with measurable work hoist their expression into a local declared inside the zone, so the
 * time it takes is captured: `const ____tracyZoneResult = <expression>; ZoneEnd(); return ____tracyZoneResult;`.
 * Trivial, multi-return, and empty returns keep the plain `ZoneEnd(); return <expression>;` order.
 *
 * @param statement - Return statement to replace.
 * @param checker - Program type checker.
 * @returns Statements replacing the original return.
 */
function createZoneEndReturnStatements(statement: ReturnStatement, checker: TypeChecker): Array<Statement> {
  if (!isHoistableReturn(statement, checker)) {
    return [createTraceZoneEndExpression(), statement];
  }

  return [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            TRACY_RESULT_IDENTIFIER,
            undefined,
            undefined,
            statement.expression as Expression
          ),
        ],
        NodeFlags.Const
      )
    ),
    createTraceZoneEndExpression(),
    factory.updateReturnStatement(statement, factory.createIdentifier(TRACY_RESULT_IDENTIFIER)),
  ];
}

export function remapStatementsWithZoneEnd<T extends { statements: NodeArray<Statement> }>(
  target: T,
  checker: TypeChecker
): Array<Statement> {
  const statements = [...target.statements];
  let index = 0;

  while (statements[index]) {
    const statement: Statement = statements[index];

    if (isReturnStatement(statement)) {
      const replacement: Array<Statement> = createZoneEndReturnStatements(statement, checker);

      statements.splice(index, 1, ...replacement);
      index += replacement.length - 1;
    }

    index++;
  }

  return statements;
}

/**
 * Recurse zone-end injection into remapped statements, skipping returns that the remap already finalized.
 *
 * @param statements - Remapped statements to recurse into.
 * @param checker - Program type checker.
 * @returns Statements with nested zone ends injected.
 */
function mapNestedStatements(statements: Array<Statement>, checker: TypeChecker): Array<Statement> {
  return statements.map((it) => (isReturnStatement(it) ? it : transformNestedStatementsToInjectEndZones(it, checker)));
}

/**
 * Inject zone ends into a nested block: replace its returns and recurse into its statements.
 *
 * @param block - Block to transform.
 * @param checker - Program type checker.
 * @returns Transformed block.
 */
function transformNestedBlock(block: Block, checker: TypeChecker): Block {
  return factory.updateBlock(block, mapNestedStatements(remapStatementsWithZoneEnd(block, checker), checker));
}

export function transformNestedStatementsToInjectEndZones(statement: Statement, checker: TypeChecker): Statement {
  if (isTraceBeginExpression(statement) || isTraceEndExpression(statement)) {
    return statement;
  }

  // Unbraced returns used as loop or `if` bodies close the zone through a wrapping block.
  if (isReturnStatement(statement)) {
    return factory.createBlock(createZoneEndReturnStatements(statement, checker), true);
  }

  if (isBlock(statement)) {
    return transformNestedBlock(statement, checker);
  } else if (isForStatement(statement)) {
    return factory.updateForStatement(
      statement,
      statement.initializer,
      statement.condition,
      statement.incrementor,
      transformNestedStatementsToInjectEndZones(statement.statement, checker)
    );
  } else if (isForInStatement(statement)) {
    return factory.updateForInStatement(
      statement,
      statement.initializer,
      statement.expression,
      transformNestedStatementsToInjectEndZones(statement.statement, checker)
    );
  } else if (isForOfStatement(statement)) {
    return factory.updateForOfStatement(
      statement,
      statement.awaitModifier,
      statement.initializer,
      statement.expression,
      transformNestedStatementsToInjectEndZones(statement.statement, checker)
    );
  } else if (isWhileStatement(statement)) {
    return factory.updateWhileStatement(
      statement,
      statement.expression,
      transformNestedStatementsToInjectEndZones(statement.statement, checker)
    );
  } else if (isDoStatement(statement)) {
    return factory.updateDoStatement(
      statement,
      transformNestedStatementsToInjectEndZones(statement.statement, checker),
      statement.expression
    );
  } else if (isIfStatement(statement)) {
    return factory.updateIfStatement(
      statement,
      statement.expression,
      transformNestedStatementsToInjectEndZones(statement.thenStatement, checker),
      statement.elseStatement ? transformNestedStatementsToInjectEndZones(statement.elseStatement, checker) : undefined
    );
  } else if (isTryStatement(statement)) {
    return factory.updateTryStatement(
      statement,
      transformNestedBlock(statement.tryBlock, checker),
      statement.catchClause
        ? factory.updateCatchClause(
            statement.catchClause,
            statement.catchClause.variableDeclaration,
            transformNestedBlock(statement.catchClause.block, checker)
          )
        : undefined,
      statement.finallyBlock ? transformNestedBlock(statement.finallyBlock, checker) : undefined
    );
  } else if (isSwitchStatement(statement)) {
    return factory.updateSwitchStatement(
      statement,
      statement.expression,
      factory.updateCaseBlock(
        statement.caseBlock,
        statement.caseBlock.clauses.map((it) => {
          if (isCaseClause(it)) {
            return factory.updateCaseClause(
              it,
              it.expression,
              mapNestedStatements(remapStatementsWithZoneEnd(it, checker), checker)
            );
          } else if (isDefaultClause(it)) {
            return factory.updateDefaultClause(
              it,
              mapNestedStatements(remapStatementsWithZoneEnd(it, checker), checker)
            );
          } else {
            return it;
          }
        })
      )
    );
  }

  return statement;
}

export function transformWithInjectedZones<T extends FunctionDeclaration | MethodDeclaration>(
  node: T,
  checker: TypeChecker,
  parentName?: string
): T {
  const name: string | undefined = node.name ? node.name.getText() : undefined;

  if (!name || !node.body?.statements.length) {
    return node;
  }

  const [firstStatement] = node.body.statements;
  const hasReturnStatement: boolean = isReturnStatement(node.body.statements[node.body.statements.length - 1]);

  // A lone trivial, empty, or multi-return `return` has no measurable work - a zone would only add overhead.
  if (
    node.body.statements.length === 1 &&
    isReturnStatement(firstStatement) &&
    !isHoistableReturn(firstStatement, checker)
  ) {
    return node;
  }

  const statements: Array<Statement> = mapNestedStatements(remapStatementsWithZoneEnd(node.body, checker), checker);

  // Zone start declaration.
  statements.unshift(
    createTraceZoneBeginNExpression(
      `lua::${isMethodDeclaration(node) ? "method" : "function"}::${parentName ? `${parentName}::` : ""}${name}`
    )
  );

  // Zone end declaration without explicit return.
  if (!hasReturnStatement) {
    statements.push(createTraceZoneEndExpression());
  }

  if (isMethodDeclaration(node)) {
    return factory.updateMethodDeclaration(
      node,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      node.parameters,
      node.type,
      factory.updateBlock(node.body, statements)
    ) as T;
  } else {
    return factory.updateFunctionDeclaration(
      node,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      factory.updateBlock(node.body, statements)
    ) as T;
  }
}

export function transformArrowFunctionWithInjectedZones<T extends ArrowFunction>(
  node: T,
  checker: TypeChecker,
  name: string
): T {
  if (!node || !name || isExpression(node.body) || !node.body.statements.length) {
    return node;
  }

  const [firstStatement] = node.body.statements;
  const hasReturnStatement: boolean = isReturnStatement(node.body.statements[node.body.statements.length - 1]);

  // A lone trivial, empty, or multi-return `return` has no measurable work - a zone would only add overhead.
  if (
    node.body.statements.length === 1 &&
    isReturnStatement(firstStatement) &&
    !isHoistableReturn(firstStatement, checker)
  ) {
    return node;
  }

  const statements: Array<Statement> = mapNestedStatements(remapStatementsWithZoneEnd(node.body, checker), checker);

  // Zone start declaration.
  statements.unshift(createTraceZoneBeginNExpression(`lua::function::${name}`));

  // Zone end declaration without explicit return.
  if (!hasReturnStatement) {
    statements.push(createTraceZoneEndExpression());
  }

  return factory.updateArrowFunction(
    node,
    node.modifiers,
    node.typeParameters,
    node.parameters,
    node.type,
    node.equalsGreaterThanToken,
    factory.updateBlock(node.body, statements)
  ) as T;
}
