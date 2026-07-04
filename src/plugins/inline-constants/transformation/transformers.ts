import * as ts from "typescript";
import * as lua from "typescript-to-lua";

import { getContainingVariableStatement, hasInlineTag, hasVirtualTag, isValueUsagePosition } from "./ast";
import { type TFoldedBinaryOperator, type TFoldedValue } from "./constants";
import { resolveMemberSymbol, tryGetInlineValue } from "./evaluation";
import {
  getVirtualDeclaration,
  getVirtualObjectEntries,
  isErasableReference,
  isPureConstantsModule,
  resolveAliasedSymbol,
  resolveModuleSourceFile,
} from "./virtual";

const NUMERIC_KEY_PATTERN: RegExp = /^(0|[1-9][0-9]*)$/;

const TREE_LUA_OPERATORS: Record<TFoldedBinaryOperator, lua.BinaryOperator> = {
  "+": lua.SyntaxKind.AdditionOperator,
  "-": lua.SyntaxKind.SubtractionOperator,
  "*": lua.SyntaxKind.MultiplicationOperator,
  "/": lua.SyntaxKind.DivisionOperator,
  "**": lua.SyntaxKind.PowerOperator,
};

const fileBindingUsageCache: WeakMap<ts.SourceFile, Map<ts.Symbol, boolean>> = new WeakMap();

/**
 * Create a Lua expression for the provided folded value.
 * Literals become Lua literals; expression trees with engine references become global access
 * expressions and arithmetic over them.
 *
 * @param value - Folded value to create expression for.
 * @param node - Original TypeScript node.
 * @returns Lua expression.
 */
export function createFoldedExpression(value: TFoldedValue, node: ts.Node): lua.Expression {
  if (typeof value === "string") {
    return lua.createStringLiteral(value, node);
  }

  if (typeof value === "boolean") {
    return lua.createBooleanLiteral(value, node);
  }

  if (typeof value === "number") {
    return value < 0
      ? lua.createUnaryExpression(
          lua.createNumericLiteral(Math.abs(value), node),
          lua.SyntaxKind.NegationOperator,
          node
        )
      : lua.createNumericLiteral(value, node);
  }

  switch (value.kind) {
    case "engine-ref": {
      let expression: lua.Expression = lua.createIdentifier(value.path[0]);

      for (const member of value.path.slice(1)) {
        expression = lua.createTableIndexExpression(expression, lua.createStringLiteral(member), node);
      }

      return expression;
    }

    case "binary":
      return lua.createBinaryExpression(
        createFoldedExpression(value.left, node),
        createFoldedExpression(value.right, node),
        TREE_LUA_OPERATORS[value.operator],
        node
      );

    case "negate":
      return lua.createUnaryExpression(
        createFoldedExpression(value.operand, node),
        lua.SyntaxKind.NegationOperator,
        node
      );
  }
}

/**
 * Create a Lua table literal that replaces an object spread of a `@virtual` object.
 * Returns null when the referenced symbol is not a virtual object or an entry cannot be computed.
 *
 * @param checker - Program type checker.
 * @param symbol - Referenced symbol of the spread expression.
 * @param node - Original TypeScript node.
 * @returns Lua table literal or null.
 */
function tryCreateVirtualSpreadTable(checker: ts.TypeChecker, symbol: ts.Symbol, node: ts.Node): lua.Expression | null {
  if (getVirtualDeclaration(checker, symbol) === null) {
    return null;
  }

  const entries: Array<[string, TFoldedValue]> | null = getVirtualObjectEntries(checker, symbol);

  if (entries === null) {
    return null;
  }

  const fields: Array<lua.TableFieldExpression> = entries.map(([name, value]) => {
    const key: lua.Expression = NUMERIC_KEY_PATTERN.test(name)
      ? lua.createNumericLiteral(Number(name))
      : lua.createStringLiteral(name);

    return lua.createTableFieldExpression(createFoldedExpression(value, node), key);
  });

  return lua.createTableExpression(fields, node);
}

/**
 * Transform property and element access expressions by inlining literal values from tagged declarations.
 * Object spreads of `@virtual` objects accessed through namespaces are expanded to table literals.
 *
 * @param node - Access expression node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when the access resolves to a tagged constant, default transformation otherwise.
 */
export function transformAccessExpression(
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  context: lua.TransformationContext
): lua.Expression {
  const symbol: ts.Symbol | null = resolveMemberSymbol(context.checker, node);

  if (symbol === null) {
    return context.superTransformExpression(node);
  }

  const value: TFoldedValue | null = tryGetInlineValue(context.checker, symbol);

  if (value !== null) {
    return createFoldedExpression(value, node);
  }

  if (node.parent !== undefined && ts.isSpreadAssignment(node.parent)) {
    const table: lua.Expression | null = tryCreateVirtualSpreadTable(context.checker, symbol, node);

    if (table !== null) {
      return table;
    }
  }

  return context.superTransformExpression(node);
}

/**
 * Transform identifier expressions by inlining literal values from tagged scalar constants
 * and expand object spreads of `@virtual` objects into table literals.
 *
 * @param node - Identifier node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when the identifier resolves to a tagged constant, default transformation otherwise.
 */
export function transformIdentifierExpression(node: ts.Identifier, context: lua.TransformationContext): lua.Expression {
  if (node.parent !== undefined && ts.isSpreadAssignment(node.parent)) {
    const symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(node);
    const table: lua.Expression | null =
      symbol === undefined ? null : tryCreateVirtualSpreadTable(context.checker, symbol, node);

    if (table !== null) {
      return table;
    }

    return context.superTransformExpression(node);
  }

  if (isValueUsagePosition(node)) {
    let symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(node);

    if (symbol !== undefined && (symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      symbol = context.checker.getAliasedSymbol(symbol);
    }

    if (symbol?.valueDeclaration !== undefined && ts.isVariableDeclaration(symbol.valueDeclaration)) {
      const value: TFoldedValue | null = tryGetInlineValue(context.checker, symbol);

      if (value !== null) {
        return createFoldedExpression(value, node);
      }
    }
  }

  return context.superTransformExpression(node);
}

/**
 * Get a map of import binding symbols to whether each binding has usages that block removal in the file.
 * Bindings with only erasable references (inlined accesses, expanded spreads, type positions) can be stripped.
 *
 * @param checker - Program type checker.
 * @param sourceFile - Source file to analyze.
 * @returns Map of import alias symbols to whether each alias has a blocking usage.
 */
function getFileBindingUsage(checker: ts.TypeChecker, sourceFile: ts.SourceFile): Map<ts.Symbol, boolean> {
  const cached: Map<ts.Symbol, boolean> | undefined = fileBindingUsageCache.get(sourceFile);

  if (cached !== undefined) {
    return cached;
  }

  const usage: Map<ts.Symbol, boolean> = new Map();

  visitNode(sourceFile);
  fileBindingUsageCache.set(sourceFile, usage);

  return usage;

  function markImportBindingUsage(symbol: ts.Symbol | undefined, isBlocking: boolean): void {
    const declaration: ts.Declaration | undefined = symbol?.declarations?.[0];

    if (symbol === undefined || declaration === undefined || !ts.isImportSpecifier(declaration)) {
      return;
    }

    if (isBlocking) {
      usage.set(symbol, true);
    } else if (!usage.has(symbol)) {
      usage.set(symbol, false);
    }
  }

  function visitNode(node: ts.Node): void {
    // References inside erased virtual statements never survive to emitted output:
    if ((ts.isVariableStatement(node) || ts.isEnumDeclaration(node)) && hasVirtualTag(node)) {
      return;
    }

    if (ts.isIdentifier(node) && node.parent !== undefined && !ts.isImportSpecifier(node.parent)) {
      // Re-exports and shorthand properties emit direct references to import bindings:
      if (ts.isExportSpecifier(node.parent)) {
        markImportBindingUsage(checker.getExportSpecifierLocalTargetSymbol(node.parent), true);
      } else if (ts.isShorthandPropertyAssignment(node.parent)) {
        markImportBindingUsage(checker.getShorthandAssignmentValueSymbol(node.parent), true);
      } else {
        const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

        if (symbol !== undefined) {
          const isVirtual: boolean = getVirtualDeclaration(checker, symbol) !== null;

          markImportBindingUsage(symbol, !isErasableReference(checker, node, symbol, isVirtual));
        }
      }
    }

    node.forEachChild(visitNode);
  }
}

/**
 * Check whether an import specifier resolves to a declaration tagged with `@inline` or `@virtual`.
 *
 * @param checker - Program type checker.
 * @param symbol - Import alias symbol to check.
 * @returns Whether the specifier target is tagged.
 */
function isTaggedImportTarget(checker: ts.TypeChecker, symbol: ts.Symbol): boolean {
  const declaration: ts.Declaration | undefined = resolveAliasedSymbol(checker, symbol).valueDeclaration;

  if (declaration === undefined) {
    return false;
  }

  if (ts.isEnumDeclaration(declaration)) {
    return hasInlineTag(declaration);
  }

  if (ts.isVariableDeclaration(declaration)) {
    const statement: ts.VariableStatement | null = getContainingVariableStatement(declaration);

    return statement !== null && hasInlineTag(statement);
  }

  return false;
}

/**
 * Transform import declarations by stripping bindings for tagged declarations with no remaining runtime usages.
 * When no runtime bindings remain, the require is dropped for provably pure modules
 * or kept as a side-effect import otherwise.
 *
 * @param statement - Import declaration to transform.
 * @param context - Transformation context.
 * @returns Transformed statements.
 */
export function transformImportDeclaration(
  statement: ts.ImportDeclaration,
  context: lua.TransformationContext
): Array<lua.Statement> {
  const clause: ts.ImportClause | undefined = statement.importClause;

  if (
    clause === undefined ||
    clause.isTypeOnly ||
    clause.name !== undefined ||
    clause.namedBindings === undefined ||
    !ts.isNamedImports(clause.namedBindings)
  ) {
    return context.superTransformStatements(statement);
  }

  const checker: ts.TypeChecker = context.checker;
  const usage: Map<ts.Symbol, boolean> = getFileBindingUsage(checker, context.sourceFile);
  const kept: Array<ts.ImportSpecifier> = [];

  let hasRuntimeBindings: boolean = false;

  for (const specifier of clause.namedBindings.elements) {
    if (specifier.isTypeOnly) {
      kept.push(specifier);
      continue;
    }

    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(specifier.name);

    if (symbol === undefined) {
      kept.push(specifier);
      hasRuntimeBindings = true;
      continue;
    }

    // Pure type imports produce no runtime bindings:
    if ((resolveAliasedSymbol(checker, symbol).flags & ts.SymbolFlags.Value) === 0) {
      kept.push(specifier);
      continue;
    }

    // Tagged targets with only erased usages and bindings with no surviving usages at all are droppable:
    const isDroppable: boolean =
      (isTaggedImportTarget(checker, symbol) || !usage.has(symbol)) && usage.get(symbol) !== true;

    if (isDroppable) {
      continue;
    }

    kept.push(specifier);
    hasRuntimeBindings = true;
  }

  if (kept.length === clause.namedBindings.elements.length) {
    return context.superTransformStatements(statement);
  }

  if (!hasRuntimeBindings) {
    const target: ts.SourceFile | null = resolveModuleSourceFile(checker, statement.moduleSpecifier);

    if (target !== null && isPureConstantsModule(checker, target)) {
      return [];
    }

    // Side effects are possible, keep the module require without bindings:
    return context.superTransformStatements(
      ts.factory.updateImportDeclaration(
        statement,
        statement.modifiers,
        undefined,
        statement.moduleSpecifier,
        undefined
      )
    );
  }

  return context.superTransformStatements(
    ts.factory.updateImportDeclaration(
      statement,
      statement.modifiers,
      ts.factory.updateImportClause(
        clause,
        clause.isTypeOnly,
        clause.name,
        ts.factory.updateNamedImports(clause.namedBindings, kept)
      ),
      statement.moduleSpecifier,
      undefined
    )
  );
}
