import * as ts from "typescript";
import * as lua from "typescript-to-lua";

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
 * Get the single `return <expression>` of a function declaration, or null when the body is not exactly one
 * return statement with a value. Only such functions can be inlined into a Lua expression position.
 *
 * @param declaration - Function declaration to inspect.
 * @returns The returned expression, or null.
 */
export function getSingleReturnExpression(declaration: ts.FunctionDeclaration): ts.Expression | null {
  const body: ts.Block | undefined = declaration.body;

  if (body === undefined || body.statements.length !== 1) {
    return null;
  }

  const [statement] = body.statements;

  if (!ts.isReturnStatement(statement) || statement.expression === undefined) {
    return null;
  }

  return statement.expression;
}

/**
 * Check whether a function declaration can be inlined: a single-return-expression body and only plain
 * identifier parameters (no rest/destructuring).
 *
 * @param declaration - Function declaration to check.
 * @returns Whether the function is inlinable.
 */
export function isInlinableFunction(declaration: ts.FunctionDeclaration): boolean {
  if (getSingleReturnExpression(declaration) === null) {
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
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword ||
    node.kind === ts.SyntaxKind.NullKeyword
  ) {
    return true;
  }

  if (ts.isPropertyAccessExpression(node)) {
    return isSideEffectFree(node.expression);
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
  const returnExpression: ts.Expression = getSingleReturnExpression(declaration) as ts.Expression;
  const usageCounts: Map<ts.Symbol, number> = countParameterUsages(checker, declaration, returnExpression);
  const substitutions: Map<ts.Symbol, ts.Expression> = new Map();

  for (let index = 0; index < declaration.parameters.length; index += 1) {
    const parameter: ts.ParameterDeclaration = declaration.parameters[index];
    const parameterSymbol: ts.Symbol | undefined = checker.getSymbolAtLocation(parameter.name);

    if (parameterSymbol === undefined) {
      return null;
    }

    const argument: ts.Expression =
      node.arguments[index] ?? parameter.initializer ?? ts.factory.createIdentifier("undefined");

    // Duplicating a side-effecting argument would change evaluation semantics; fall back to a real call.
    if ((usageCounts.get(parameterSymbol) ?? 0) > 1 && !isSideEffectFree(argument)) {
      return null;
    }

    substitutions.set(parameterSymbol, argument);
  }

  return context.transformExpression(substituteParameters(checker, returnExpression, substitutions));
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
