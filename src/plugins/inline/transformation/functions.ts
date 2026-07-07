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
 * Check whether a function declaration can be inlined: a single-return-expression body and only plain
 * identifier parameters (no rest/destructuring).
 *
 * @param declaration - Function declaration to check.
 * @returns Whether the function is inlinable.
 */
export function isInlinableFunction(declaration: ts.FunctionDeclaration): boolean {
  if (getInlineBody(declaration) === null) {
    return false;
  }

  return declaration.parameters.every(
    (parameter) => ts.isIdentifier(parameter.name) && parameter.dotDotDotToken === undefined
  );
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
 * Count how many times each parameter symbol is referenced inside an expression.
 *
 * @param checker - Program type checker.
 * @param declaration - Function declaration owning the parameters.
 * @param expression - Expression to scan.
 * @returns Map of parameter symbol to reference count.
 */
function countParameterUsages(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  expression: ts.Expression
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

  visit(expression);

  return counts;
}

/**
 * Clone an expression, replacing every identifier that resolves to a mapped parameter symbol with its
 * argument expression. Original (non-parameter) nodes are reused so the checker still resolves them.
 *
 * @param checker - Program type checker.
 * @param expression - Expression to rewrite.
 * @param substitutions - Map of parameter symbol to argument expression.
 * @returns Rewritten expression.
 */
function substituteParameters(
  checker: ts.TypeChecker,
  expression: ts.Expression,
  substitutions: Map<ts.Symbol, ts.Expression>
): ts.Expression {
  const visit = (node: ts.Node): ts.Node => {
    if (ts.isIdentifier(node)) {
      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

      if (symbol !== undefined && substitutions.has(symbol)) {
        return substitutions.get(symbol) as ts.Expression;
      }

      return node;
    }

    return ts.visitEachChild(node, visit, SUBSTITUTION_CONTEXT);
  };

  return ts.visitNode(expression, visit) as ts.Expression;
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
 * Decide whether a call to an inlinable function can be folded: every parameter symbol must resolve, and no
 * parameter used more than once may receive a side-effecting argument (duplicating it would change semantics).
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

  const usageCounts: Map<ts.Symbol, number> = countParameterUsages(checker, declaration, body.expression);

  for (let index = 0; index < declaration.parameters.length; index += 1) {
    const parameterSymbol: ts.Symbol | undefined = checker.getSymbolAtLocation(declaration.parameters[index].name);

    if (parameterSymbol === undefined) {
      return false;
    }

    if ((usageCounts.get(parameterSymbol) ?? 0) > 1 && !isSideEffectFree(getArgumentForParameter(declaration, node, index))) {
      return false;
    }
  }

  return true;
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
  const substitutions: Map<ts.Symbol, ts.Expression> = new Map();

  for (let index = 0; index < declaration.parameters.length; index += 1) {
    const parameterSymbol: ts.Symbol = checker.getSymbolAtLocation(declaration.parameters[index].name) as ts.Symbol;

    substitutions.set(parameterSymbol, getArgumentForParameter(declaration, node, index));
  }

  return context.transformExpression(substituteParameters(checker, body.expression, substitutions));
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
