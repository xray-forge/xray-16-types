import * as ts from "typescript";
import type * as lua from "typescript-to-lua";

import { hasInlineTag, unwrapInitializer } from "./ast";
import { resolveAliasedSymbol } from "./virtual";

// Minimal context for `ts.visitEachChild`; only `factory` is used when cloning expression trees.
const SUBSTITUTION_CONTEXT: ts.TransformationContext = {
  factory: ts.factory,
  startLexicalEnvironment: () => undefined,
  suspendLexicalEnvironment: () => undefined,
  resumeLexicalEnvironment: () => undefined,
  endLexicalEnvironment: () => undefined,
  hoistFunctionDeclaration: () => undefined,
  hoistVariableDeclaration: () => undefined,
} as unknown as ts.TransformationContext;

/**
 * The splice-able body of an inlinable function.
 */
export interface IInlineBody {
  /** Expression substituted at the call site. */
  expression: ts.Expression;
  /**
   * Whether the body is a `void` expression statement (e.g. `object.foo()`), which lacks a return value and so
   * can only be inlined at Lua statement position (where the result is discarded). A `return <expr>` body is
   * `false` and inlines in any position.
   */
  statementOnly: boolean;
}

/**
 * Get the single splice-able body of a function declaration: either its `return <expression>` (inlinable in
 * any position) or a lone `void` expression statement (inlinable only at statement position). Null otherwise.
 *
 * @param declaration - Function declaration to inspect.
 * @returns The inline body descriptor, or null.
 */
export function getInlineBody(declaration: ts.FunctionDeclaration): IInlineBody | null {
  const body: ts.Block | undefined = declaration.body;

  if (body === undefined || body.statements.length !== 1) {
    return null;
  }

  const [statement] = body.statements;

  if (ts.isReturnStatement(statement) && statement.expression !== undefined) {
    return { expression: statement.expression, statementOnly: false };
  }

  if (ts.isExpressionStatement(statement)) {
    return { expression: statement.expression, statementOnly: true };
  }

  return null;
}

/**
 * Whether a call sits at Lua statement position (a bare expression statement, its result discarded).
 *
 * @param node - Call expression to check.
 * @returns Whether the call is a statement-position call.
 */
function isStatementPositionCall(node: ts.CallExpression): boolean {
  return node.parent !== undefined && ts.isExpressionStatement(node.parent) && node.parent.expression === node;
}

/**
 * Get the guard body supported by `@inline`.
 *
 * A guard is a single `if (condition) { ... }` statement with no `else`. Its branch may contain only expression
 * statements, so inlining cannot splice `return`, `break`, or `continue` into the caller.
 *
 * @param declaration - Function declaration to inspect.
 * @returns The guard `if` statement, or null.
 */
export function getInlineGuard(declaration: ts.FunctionDeclaration): ts.IfStatement | null {
  const body: ts.Block | undefined = declaration.body;

  if (body === undefined || body.statements.length !== 1) {
    return null;
  }

  const [statement] = body.statements;

  if (!ts.isIfStatement(statement) || statement.elseStatement !== undefined) {
    return null;
  }

  const branch: ts.Statement = statement.thenStatement;
  const branchStatements: ReadonlyArray<ts.Statement> = ts.isBlock(branch) ? branch.statements : [branch];

  return branchStatements.every((branchStatement) => ts.isExpressionStatement(branchStatement)) ? statement : null;
}

/**
 * Check whether every parameter is a plain identifier.
 *
 * A trailing rest parameter is allowed only when `allowRest` is set. Destructuring is never allowed.
 *
 * @param declaration - Function declaration to check.
 * @param allowRest - Whether a trailing `...rest` parameter is permitted.
 * @returns Whether the parameter list is inlinable.
 */
function hasInlinableParameters(declaration: ts.FunctionDeclaration, allowRest: boolean): boolean {
  return declaration.parameters.every((parameter, index) => {
    if (!ts.isIdentifier(parameter.name)) {
      return false;
    }

    if (parameter.dotDotDotToken === undefined) {
      return true;
    }

    return allowRest && index === declaration.parameters.length - 1;
  });
}

/**
 * Check whether a function can be inlined as an expression.
 *
 * @param declaration - Function declaration to check.
 * @returns Whether the function is expression-inlinable.
 */
export function isInlinableFunction(declaration: ts.FunctionDeclaration): boolean {
  return getInlineBody(declaration) !== null && hasInlinableParameters(declaration, false);
}

/**
 * Check whether a function can be inlined as a statement guard.
 *
 * @param declaration - Function declaration to check.
 * @returns Whether the function is guard-inlinable.
 */
export function isInlinableGuardFunction(declaration: ts.FunctionDeclaration): boolean {
  return getInlineGuard(declaration) !== null && hasInlinableParameters(declaration, true);
}

/**
 * Resolve a call expression to the inlinable `@inline` function declaration it targets, or null.
 *
 * @param checker - Program type checker.
 * @param node - Call expression to resolve.
 * @returns The inlinable target function declaration, or null.
 */
export function getInlineFunctionDeclaration(
  checker: ts.TypeChecker,
  node: ts.CallExpression
): ts.FunctionDeclaration | null {
  if (!ts.isIdentifier(node.expression)) {
    return null;
  }

  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node.expression);

  if (symbol === undefined) {
    return null;
  }

  const declaration: ts.Declaration | undefined = resolveAliasedSymbol(checker, symbol).valueDeclaration;

  if (declaration === undefined || !ts.isFunctionDeclaration(declaration) || !hasInlineTag(declaration)) {
    return null;
  }

  return isInlinableFunction(declaration) ? declaration : null;
}

/**
 * Check whether an expression is free of side effects, so duplicating it during inlining is safe.
 *
 * @param expression - Expression to check.
 * @returns Whether the expression can be duplicated safely.
 */
function isSideEffectFree(expression: ts.Expression): boolean {
  const node: ts.Expression = unwrapInitializer(expression) ?? expression;

  if (
    ts.isIdentifier(node) ||
    ts.isLiteralExpression(node) ||
    node.kind === ts.SyntaxKind.ThisKeyword ||
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword ||
    node.kind === ts.SyntaxKind.NullKeyword
  ) {
    return true;
  }

  // Field reads on a side-effect-free base are safe to duplicate (plain table index, no call).
  if (ts.isPropertyAccessExpression(node)) {
    return isSideEffectFree(node.expression);
  }

  if (ts.isElementAccessExpression(node)) {
    return isSideEffectFree(node.expression) && isSideEffectFree(node.argumentExpression);
  }

  if (ts.isPrefixUnaryExpression(node)) {
    return isSideEffectFree(node.operand);
  }

  return false;
}

/**
 * Count how many times each parameter symbol is referenced inside a node subtree.
 *
 * @param checker - Program type checker.
 * @param declaration - Function declaration owning the parameters.
 * @param scanNode - Node subtree to scan (an expression body or a guard `if` statement).
 * @returns Map of parameter symbol to reference count.
 */
function countParameterUsages(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  scanNode: ts.Node
): Map<ts.Symbol, number> {
  const parameterSymbols: Set<ts.Symbol> = new Set();

  for (const parameter of declaration.parameters) {
    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(parameter.name);

    if (symbol !== undefined) {
      parameterSymbols.add(symbol);
    }
  }

  const counts: Map<ts.Symbol, number> = new Map();

  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

      if (symbol !== undefined && parameterSymbols.has(symbol)) {
        counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
      }
    }

    node.forEachChild(visit);
  };

  visit(scanNode);

  return counts;
}

/**
 * Substitution data for a trailing rest parameter.
 */
interface IRestSubstitution {
  symbol: ts.Symbol;
  expressions: ReadonlyArray<ts.Expression>;
}

/**
 * Clone a node subtree and replace parameter references with call arguments.
 *
 * If the inline target has a rest parameter, `...rest` spreads are expanded to the caller's trailing arguments.
 *
 * @param checker - Program type checker.
 * @param node - Node to rewrite (expression body or guard `if` statement).
 * @param substitutions - Map of parameter symbol to argument expression.
 * @param restSubstitution - Trailing rest parameter substitution, or null.
 * @returns Rewritten node.
 */
function substituteInNode<T extends ts.Node>(
  checker: ts.TypeChecker,
  node: T,
  substitutions: Map<ts.Symbol, ts.Expression>,
  restSubstitution: IRestSubstitution | null
): T {
  const visit = (current: ts.Node): ts.Node => {
    // Expand `...rest` of the rest parameter into the caller's trailing arguments inside a call.
    if (restSubstitution !== null && ts.isCallExpression(current)) {
      const args: Array<ts.Expression> = [];

      for (const argument of current.arguments) {
        if (
          ts.isSpreadElement(argument) &&
          checker.getSymbolAtLocation(argument.expression) === restSubstitution.symbol
        ) {
          args.push(...restSubstitution.expressions);
        } else {
          args.push(ts.visitNode(argument, visit) as ts.Expression);
        }
      }

      return ts.factory.updateCallExpression(
        current,
        ts.visitNode(current.expression, visit) as ts.Expression,
        current.typeArguments,
        args
      );
    }

    if (ts.isIdentifier(current)) {
      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(current);

      if (symbol !== undefined && substitutions.has(symbol)) {
        return substitutions.get(symbol) as ts.Expression;
      }

      return current;
    }

    return ts.visitEachChild(current, visit, SUBSTITUTION_CONTEXT);
  };

  return ts.visitNode(node, visit) as T;
}

/**
 * Build parameter substitutions for a call.
 *
 * @param checker - Program type checker.
 * @param declaration - Inlinable function declaration.
 * @param node - Call expression.
 * @returns The substitution map and optional rest substitution.
 */
function buildSubstitutions(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression
): { substitutions: Map<ts.Symbol, ts.Expression>; restSubstitution: IRestSubstitution | null } {
  const substitutions: Map<ts.Symbol, ts.Expression> = new Map();
  let restSubstitution: IRestSubstitution | null = null;

  for (let index = 0; index < declaration.parameters.length; index += 1) {
    const parameter: ts.ParameterDeclaration = declaration.parameters[index];
    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(parameter.name);

    if (symbol === undefined) {
      continue;
    }

    if (parameter.dotDotDotToken !== undefined) {
      restSubstitution = { symbol, expressions: node.arguments.slice(index) };
    } else {
      substitutions.set(symbol, getArgumentForParameter(declaration, node, index));
    }
  }

  return { substitutions, restSubstitution };
}

/**
 * Resolve the argument expression bound to a parameter at a call site, applying its default when omitted.
 *
 * @param declaration - Inlinable function declaration.
 * @param node - Call expression.
 * @param index - Parameter index.
 * @returns The argument expression (or default / `undefined` placeholder).
 */
function getArgumentForParameter(
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression,
  index: number
): ts.Expression {
  return node.arguments[index] ?? declaration.parameters[index].initializer ?? ts.factory.createIdentifier("undefined");
}

/**
 * Decide whether a call's arguments are safe to substitute into a body.
 *
 * Reused parameters may not receive side-effecting arguments because inlining would duplicate them. A reused rest
 * parameter requires every trailing argument to be side-effect free.
 *
 * @param checker - Program type checker.
 * @param declaration - Target inlinable function declaration.
 * @param node - Call expression to check.
 * @param scanNode - The body node the parameters substitute into (expression body or guard `if`).
 * @returns Whether the arguments are safe to inline.
 */
function hasSafeArguments(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression,
  scanNode: ts.Node
): boolean {
  const usageCounts: Map<ts.Symbol, number> = countParameterUsages(checker, declaration, scanNode);

  for (let index = 0; index < declaration.parameters.length; index += 1) {
    const parameter: ts.ParameterDeclaration = declaration.parameters[index];
    const parameterSymbol: ts.Symbol | undefined = checker.getSymbolAtLocation(parameter.name);

    if (parameterSymbol === undefined) {
      return false;
    }

    if ((usageCounts.get(parameterSymbol) ?? 0) <= 1) {
      continue;
    }

    if (parameter.dotDotDotToken !== undefined) {
      if (!node.arguments.slice(index).every(isSideEffectFree)) {
        return false;
      }
    } else if (!isSideEffectFree(getArgumentForParameter(declaration, node, index))) {
      return false;
    }
  }

  return true;
}

/**
 * Decide whether a call to an expression-inlinable function can be folded.
 *
 * @param checker - Program type checker.
 * @param declaration - Target inlinable function declaration.
 * @param node - Call expression to check.
 * @returns Whether the call can be inlined.
 */
export function canInlineCall(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression
): boolean {
  const body: IInlineBody | null = getInlineBody(declaration);

  if (body === null) {
    return false;
  }

  // A `void` expression-statement body has no return value, so it may only be spliced where the result is
  // discarded (statement position); elsewhere fall back to a real call.
  if (body.statementOnly && !isStatementPositionCall(node)) {
    return false;
  }

  return hasSafeArguments(checker, declaration, node, body.expression);
}

/**
 * Decide whether a call to a guard-inlinable function can be folded into a statement-position `if`.
 *
 * @param checker - Program type checker.
 * @param declaration - Target guard-inlinable function declaration.
 * @param node - Call expression to check.
 * @returns Whether the guard call can be inlined.
 */
function canInlineGuardCall(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression
): boolean {
  const guard: ts.IfStatement | null = getInlineGuard(declaration);

  if (guard === null || !isStatementPositionCall(node)) {
    return false;
  }

  return hasSafeArguments(checker, declaration, node, guard);
}

/**
 * Check whether an identifier is the callee of a call that will be inlined, so its import binding reference
 * does not survive to emitted output and can be stripped.
 *
 * @param checker - Program type checker.
 * @param node - Identifier node to check.
 * @returns Whether the identifier is an inlined-call callee.
 */
export function isInlinedCalleeReference(checker: ts.TypeChecker, node: ts.Identifier): boolean {
  const parent: ts.Node | undefined = node.parent;

  if (parent === undefined || !ts.isCallExpression(parent) || parent.expression !== node) {
    return false;
  }

  const declaration: ts.FunctionDeclaration | null = getInlineFunctionDeclaration(checker, parent);

  return declaration !== null && canInlineCall(checker, declaration, parent);
}

/**
 * Inline a call to an `@inline` single-return function by substituting arguments into its return expression.
 * Returns null when inlining would duplicate a side-effecting argument, so the caller can fall back to a
 * regular call.
 *
 * @param declaration - Target inlinable function declaration.
 * @param node - Call expression to inline.
 * @param context - Transformation context.
 * @returns The inlined Lua expression, or null to fall back.
 */
function tryInlineFunctionCall(
  declaration: ts.FunctionDeclaration,
  node: ts.CallExpression,
  context: lua.TransformationContext
): lua.Expression | null {
  const checker: ts.TypeChecker = context.checker;

  if (!canInlineCall(checker, declaration, node)) {
    return null;
  }

  const body: IInlineBody = getInlineBody(declaration) as IInlineBody;
  const { substitutions, restSubstitution } = buildSubstitutions(checker, declaration, node);

  return context.transformExpression(substituteInNode(checker, body.expression, substitutions, restSubstitution));
}

/**
 * Transform call expressions by inlining calls to `@inline` single-return functions.
 *
 * @param node - Call expression to transform.
 * @param context - Transformation context.
 * @returns Inlined Lua expression when applicable, default transformation otherwise.
 */
export function transformCallExpression(node: ts.CallExpression, context: lua.TransformationContext): lua.Expression {
  const declaration: ts.FunctionDeclaration | null = getInlineFunctionDeclaration(context.checker, node);

  if (declaration !== null) {
    const inlined: lua.Expression | null = tryInlineFunctionCall(declaration, node, context);

    if (inlined !== null) {
      return inlined;
    }
  }

  return context.superTransformExpression(node);
}

/**
 * Resolve a call expression to the guard-inlinable `@inline` function declaration it targets, or null.
 *
 * @param checker - Program type checker.
 * @param node - Call expression to resolve.
 * @returns The guard-inlinable target function declaration, or null.
 */
function getInlineGuardDeclaration(checker: ts.TypeChecker, node: ts.CallExpression): ts.FunctionDeclaration | null {
  if (!ts.isIdentifier(node.expression)) {
    return null;
  }

  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node.expression);

  if (symbol === undefined) {
    return null;
  }

  const declaration: ts.Declaration | undefined = resolveAliasedSymbol(checker, symbol).valueDeclaration;

  if (declaration === undefined || !ts.isFunctionDeclaration(declaration) || !hasInlineTag(declaration)) {
    return null;
  }

  return isInlinableGuardFunction(declaration) ? declaration : null;
}

/**
 * Transform a guard-`@inline` call into a Lua `if` statement.
 *
 * Falls back to the default statement transform when the expression statement is not an inlinable guard call.
 *
 * @param node - Expression statement to transform.
 * @param context - Transformation context.
 * @returns The inlined guard statements, or the default transformation.
 */
export function transformExpressionStatement(
  node: ts.ExpressionStatement,
  context: lua.TransformationContext
): lua.Statement | Array<lua.Statement> {
  if (ts.isCallExpression(node.expression)) {
    const call: ts.CallExpression = node.expression;
    const declaration: ts.FunctionDeclaration | null = getInlineGuardDeclaration(context.checker, call);

    if (declaration !== null && canInlineGuardCall(context.checker, declaration, call)) {
      const guard: ts.IfStatement = getInlineGuard(declaration) as ts.IfStatement;
      const { substitutions, restSubstitution } = buildSubstitutions(context.checker, declaration, call);

      return context.transformStatements(substituteInNode(context.checker, guard, substitutions, restSubstitution));
    }
  }

  return context.superTransformStatements(node);
}
