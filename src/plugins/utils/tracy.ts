import {
  ArrowFunction,
  ConstructorDeclaration,
  ExpressionStatement,
  factory,
  FunctionDeclaration,
  isBlock,
  isCallExpression,
  isCaseClause,
  isConstructorDeclaration,
  isDefaultClause,
  isExpression,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isIfStatement,
  isMethodDeclaration,
  isPropertyAccessExpression,
  isReturnStatement,
  isSwitchStatement,
  MethodDeclaration,
  Node,
  NodeArray,
  Statement,
  SyntaxKind,
} from "typescript";

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

export function remapStatementsWithZoneEnd<T extends { statements: NodeArray<Statement> }>(
  target: T
): Array<Statement> {
  const statements = [...target.statements];
  let index = 0;

  while (statements[index]) {
    if (isReturnStatement(statements[index])) {
      statements.splice(index, 0, createTraceZoneEndExpression());
      index += 1;
    }

    index++;
  }

  return statements;
}

export function transformNestedStatementsToInjectEndZones(statement?: Statement): Statement {
  if (!statement || isTraceBeginExpression(statement) || isTraceEndExpression(statement)) {
    return statement;
  }

  if (isBlock(statement)) {
    const statements = [...statement.statements];
    let index = 0;

    while (statements[index]) {
      if (isReturnStatement(statements[index])) {
        statements.splice(index, 0, createTraceZoneEndExpression());
        index += 1;
      }

      index++;
    }

    return factory.updateBlock(
      statement,
      remapStatementsWithZoneEnd(statement).map((it) => transformNestedStatementsToInjectEndZones(it))
    );
  } else if (isForStatement(statement)) {
    if (isBlock(statement.statement)) {
      return factory.updateForStatement(
        statement,
        statement.initializer,
        statement.condition,
        statement.incrementor,
        transformNestedStatementsToInjectEndZones(statement.statement)
      );
    } else {
      throw new Error(
        `Unexpected nested for statement: ${statement.statement.kind} (${SyntaxKind[statement.statement.kind]}).`
      );
    }
  } else if (isForInStatement(statement)) {
    if (isBlock(statement.statement)) {
      return factory.updateForInStatement(
        statement,
        statement.initializer,
        statement.expression,
        transformNestedStatementsToInjectEndZones(statement.statement)
      );
    } else {
      throw new Error(
        `Unexpected nested for-in statement: ${statement.statement.kind} (${SyntaxKind[statement.statement.kind]}).`
      );
    }
  } else if (isForOfStatement(statement)) {
    if (isBlock(statement.statement)) {
      return factory.updateForOfStatement(
        statement,
        statement.awaitModifier,
        statement.initializer,
        statement.expression,
        transformNestedStatementsToInjectEndZones(statement.statement)
      );
    } else {
      throw new Error(
        `Unexpected nested for-of statement: ${statement.statement.kind} (${SyntaxKind[statement.statement.kind]}).`
      );
    }
  } else if (isIfStatement(statement)) {
    return factory.updateIfStatement(
      statement,
      statement.expression,
      transformNestedStatementsToInjectEndZones(statement.thenStatement),
      transformNestedStatementsToInjectEndZones(statement.elseStatement)
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
              remapStatementsWithZoneEnd(it).map((it) => transformNestedStatementsToInjectEndZones(it))
            );
          } else if (isDefaultClause(it)) {
            return factory.updateDefaultClause(
              it,
              remapStatementsWithZoneEnd(it).map((it) => transformNestedStatementsToInjectEndZones(it))
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

export function transformWithInjectedZones<T extends FunctionDeclaration | MethodDeclaration | ConstructorDeclaration>(
  node: T,
  parentName?: string
): T {
  const name: string = node.name ? node.name.getText() : null;

  if (!name || !node.body?.statements.length) {
    return node;
  }

  const hasReturnStatement: boolean = isReturnStatement(node.body.statements[node.body.statements.length - 1]);

  // Single line function declaration with return, nothing to profile here without complex assign transformations.
  if (hasReturnStatement && node.body.statements.length === 1) {
    return node;
  }

  const statements: Array<Statement> = remapStatementsWithZoneEnd(node.body).map(
    transformNestedStatementsToInjectEndZones
  );

  // Zone start declaration.
  statements.unshift(createTraceZoneBeginNExpression(`${parentName ? `${parentName}::` : ""}${name}@lua`));

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
  } else if (isConstructorDeclaration(node)) {
    return factory.updateConstructorDeclaration(
      node,
      node.modifiers,
      node.parameters,
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

export function transformArrowFunctionWithInjectedZones<T extends ArrowFunction>(node: T, name: string): T {
  if (!node || !name || isExpression(node.body) || !node.body.statements.length) {
    return node;
  }

  const hasReturnStatement: boolean = isReturnStatement(node.body.statements[node.body.statements.length - 1]);

  // Single line function declaration with return, nothing to profile here without complex assign transformations.
  if (hasReturnStatement && node.body.statements.length === 1) {
    return node;
  }

  const statements: Array<Statement> = remapStatementsWithZoneEnd(node.body).map(
    transformNestedStatementsToInjectEndZones
  );

  // Zone start declaration.
  statements.unshift(createTraceZoneBeginNExpression(`${name}@lua`));

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
