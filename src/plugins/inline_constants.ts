import * as ts from "typescript";
import * as lua from "typescript-to-lua";
import { type Plugin } from "typescript-to-lua";

import { createErrorDiagnosticFactory } from "./utils/diagnostics";

const INLINE_TAG: string = "inline";

type TInlineValue = string | number | boolean;

const createUnsupportedDeclarationError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' is supported only for enums and module-level 'const' declarations.`
);

const createNotModuleLevelError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' declarations must be module-level statements.`
);

const createNotConstError = createErrorDiagnosticFactory(`'@${INLINE_TAG}' declarations must use 'const' keyword.`);

const createNotLiteralConstantError = createErrorDiagnosticFactory(
  (name: string) =>
    `'@${INLINE_TAG}' constant '${name}' must have a literal string/number/boolean type, ` +
    "use a literal initializer or 'as const' assertion."
);

const createNotLiteralPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' must have a literal string/number/boolean type, ` +
    "did you forget 'as const' assertion?"
);

const createForeignPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' is declared outside of '@${INLINE_TAG}' statements, ` +
    `mark the source declaration with '@${INLINE_TAG}' too.`
);

const createNotConstantEnumMemberError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' enum member '${name}' must have a compile-time constant value.`
);

/**
 * Check whether node is annotated with `@inline` JSDoc tag.
 *
 * @param node - Node to check tags for.
 * @returns Whether the node has `@inline` JSDoc tag.
 */
function hasInlineTag(node: ts.Node): boolean {
  return ts.getJSDocTags(node).some((it) => it.tagName.text === INLINE_TAG);
}

/**
 * Find variable statement containing provided declaration node, if any.
 *
 * @param node - Declaration node to walk up from.
 * @returns Containing variable statement or null.
 */
function getContainingVariableStatement(node: ts.Node): ts.VariableStatement | null {
  let current: ts.Node | undefined = node;

  while (current !== undefined && !ts.isSourceFile(current)) {
    if (ts.isVariableStatement(current)) {
      return current;
    }

    current = current.parent;
  }

  return null;
}

/**
 * Unwrap initializer expression from as/satisfies/parenthesized wrappers.
 *
 * @param expression - Initializer expression to unwrap.
 * @returns Unwrapped expression or null.
 */
function unwrapInitializer(expression?: ts.Expression): ts.Expression | null {
  let current: ts.Expression | null = expression ?? null;

  while (
    current !== null &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isTypeAssertionExpression(current))
  ) {
    current = current.expression;
  }

  return current;
}

/**
 * Get literal value of symbol declared type, if it is a unit type.
 * Uses declared type instead of flow-narrowed type so mutable narrowed values are never inlined.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to get declared literal value for.
 * @returns Literal value or null.
 */
function getDeclaredLiteralValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  const type: ts.Type = checker.getTypeOfSymbolAtLocation(symbol, declaration);

  if (type.isStringLiteral()) {
    return type.value;
  }

  if (type.isNumberLiteral()) {
    return type.value;
  }

  if ((type.flags & ts.TypeFlags.BooleanLiteral) !== 0) {
    return checker.typeToString(type) === "true";
  }

  return null;
}

/**
 * Get inline-able literal value for a symbol resolved from an access expression or identifier.
 * Only symbols declared inside `@inline` tagged enums / variable statements produce values.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to resolve inline value for.
 * @returns Literal value or null.
 */
function tryGetInlineValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumMember(declaration)) {
    if (!hasInlineTag(declaration.parent)) {
      return null;
    }

    const value: string | number | undefined = checker.getConstantValue(declaration);

    return typeof value === "string" || typeof value === "number" ? value : null;
  }

  if (
    ts.isPropertyAssignment(declaration) ||
    ts.isShorthandPropertyAssignment(declaration) ||
    ts.isVariableDeclaration(declaration)
  ) {
    const statement: ts.VariableStatement | null = getContainingVariableStatement(declaration);

    if (statement === null || !hasInlineTag(statement)) {
      return null;
    }

    return getDeclaredLiteralValue(checker, symbol);
  }

  return null;
}

/**
 * Resolve member symbol for property/element access expression.
 * Element access with literal key is resolved through object type when direct symbol resolution fails.
 *
 * @param checker - Program type checker.
 * @param node - Access expression to resolve symbol for.
 * @returns Resolved member symbol or null.
 */
function resolveMemberSymbol(
  checker: ts.TypeChecker,
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression
): ts.Symbol | null {
  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

  if (symbol !== undefined) {
    return symbol;
  }

  if (
    ts.isElementAccessExpression(node) &&
    (ts.isStringLiteralLike(node.argumentExpression) || ts.isNumericLiteral(node.argumentExpression))
  ) {
    return checker.getTypeAtLocation(node.expression).getProperty(node.argumentExpression.text) ?? null;
  }

  return null;
}

/**
 * Create lua literal expression for provided constant value.
 *
 * @param value - Constant value to create literal for.
 * @param node - Original typescript node.
 * @returns Lua literal expression.
 */
function createLiteralExpression(value: TInlineValue, node: ts.Node): lua.Expression {
  if (typeof value === "string") {
    return lua.createStringLiteral(value, node);
  }

  if (typeof value === "boolean") {
    return lua.createBooleanLiteral(value, node);
  }

  return value < 0
    ? lua.createUnaryExpression(lua.createNumericLiteral(Math.abs(value), node), lua.SyntaxKind.NegationOperator, node)
    : lua.createNumericLiteral(value, node);
}

/**
 * Check whether identifier node is used in a value position where it can be replaced with a literal.
 *
 * @param node - Identifier node to check.
 * @returns Whether identifier is a replace-able value usage.
 */
function isValueUsagePosition(node: ts.Identifier): boolean {
  const parent: ts.Node | undefined = node.parent;

  if (parent === undefined || ts.isPartOfTypeNode(node)) {
    return false;
  }

  if (ts.isPropertyAccessExpression(parent)) {
    return parent.expression === node;
  }

  if (
    ts.isPropertyAssignment(parent) ||
    ts.isBindingElement(parent) ||
    ts.isParameter(parent) ||
    ts.isEnumMember(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isVariableDeclaration(parent)
  ) {
    return parent.initializer === node;
  }

  if (
    ts.isShorthandPropertyAssignment(parent) ||
    ts.isImportSpecifier(parent) ||
    ts.isImportClause(parent) ||
    ts.isNamespaceImport(parent) ||
    ts.isExportSpecifier(parent) ||
    ts.isNamespaceExport(parent) ||
    ts.isImportEqualsDeclaration(parent) ||
    ts.isQualifiedName(parent) ||
    ts.isLabeledStatement(parent) ||
    ts.isBreakOrContinueStatement(parent)
  ) {
    return false;
  }

  if (
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent)
  ) {
    return parent.name !== node;
  }

  return true;
}

/**
 * Validate `@inline` tagged variable statement and push diagnostics for not supported shapes.
 * Tagged statements must be module-level `const` declarations with literal scalars or flat `as const` object literals.
 *
 * @param statement - Tagged variable statement to validate.
 * @param context - Transformation context.
 */
function validateVariableStatement(statement: ts.VariableStatement, context: lua.TransformationContext): void {
  if (!ts.isSourceFile(statement.parent)) {
    context.diagnostics.push(createNotModuleLevelError(statement));
  }

  if ((statement.declarationList.flags & ts.NodeFlags.Const) === 0) {
    context.diagnostics.push(createNotConstError(statement));

    return;
  }

  for (const declaration of statement.declarationList.declarations) {
    const name: string = declaration.name.getText();
    const initializer: ts.Expression | null = unwrapInitializer(declaration.initializer);

    if (initializer !== null && ts.isObjectLiteralExpression(initializer)) {
      const type: ts.Type = context.checker.getTypeAtLocation(declaration);

      for (const property of type.getProperties()) {
        const propertyDeclaration: ts.Declaration | undefined = property.valueDeclaration;
        const sourceStatement: ts.VariableStatement | null =
          propertyDeclaration === undefined ? null : getContainingVariableStatement(propertyDeclaration);

        if (sourceStatement !== statement && (sourceStatement === null || !hasInlineTag(sourceStatement))) {
          context.diagnostics.push(createForeignPropertyError(propertyDeclaration ?? declaration, name, property.name));
        } else if (getDeclaredLiteralValue(context.checker, property) === null) {
          context.diagnostics.push(
            createNotLiteralPropertyError(propertyDeclaration ?? declaration, name, property.name)
          );
        }
      }
    } else {
      const symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(declaration.name);

      if (symbol === undefined || getDeclaredLiteralValue(context.checker, symbol) === null) {
        context.diagnostics.push(createNotLiteralConstantError(declaration, name));
      }
    }
  }
}

/**
 * Transform property/element access expressions, inline literal values of `@inline` tagged declarations.
 *
 * @param node - Access expression node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when access resolves to a tagged constant, default transformation otherwise.
 */
function transformAccessExpression(
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  context: lua.TransformationContext
): lua.Expression {
  const symbol: ts.Symbol | null = resolveMemberSymbol(context.checker, node);
  const value: TInlineValue | null = symbol === null ? null : tryGetInlineValue(context.checker, symbol);

  return value === null ? context.superTransformExpression(node) : createLiteralExpression(value, node);
}

/**
 * Plugin that inlines compile-time constant values of `@inline` JSDoc tagged declarations.
 *
 * Supported targets are enums, module-level `as const` object literals and module-level literal scalar constants.
 * Tagged declarations act as an explicit whitelist - member accesses are replaced with literal values in place,
 * while original tables are still emitted, so iteration / reverse mapping / whole-object usages keep working.
 * Tagged declarations that cannot be inlined produce build errors instead of silently emitting property lookups.
 */
const plugin: Plugin = {
  beforeTransform(program: ts.Program): Array<ts.Diagnostic> | void {
    // Force binder to assign node parents before any 'getJSDocTags' call,
    // otherwise empty results are computed for parent-less nodes and cached on them forever.
    program.getTypeChecker();

    const diagnostics: Array<ts.Diagnostic> = [];

    for (const sourceFile of program.getSourceFiles()) {
      if (sourceFile.isDeclarationFile) {
        continue;
      }

      for (const statement of sourceFile.statements) {
        if (hasInlineTag(statement) && !ts.isVariableStatement(statement) && !ts.isEnumDeclaration(statement)) {
          diagnostics.push(createUnsupportedDeclarationError(statement));
        }
      }
    }

    if (diagnostics.length > 0) {
      return diagnostics;
    }
  },
  visitors: {
    [ts.SyntaxKind.PropertyAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.ElementAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.Identifier]: (node, context) => {
      if (isValueUsagePosition(node)) {
        let symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(node);

        if (symbol !== undefined && (symbol.flags & ts.SymbolFlags.Alias) !== 0) {
          symbol = context.checker.getAliasedSymbol(symbol);
        }

        if (symbol?.valueDeclaration !== undefined && ts.isVariableDeclaration(symbol.valueDeclaration)) {
          const value: TInlineValue | null = tryGetInlineValue(context.checker, symbol);

          if (value !== null) {
            return createLiteralExpression(value, node);
          }
        }
      }

      return context.superTransformExpression(node);
    },
    [ts.SyntaxKind.VariableStatement]: (statement, context) => {
      if (hasInlineTag(statement)) {
        validateVariableStatement(statement, context);
      }

      return context.superTransformStatements(statement);
    },
    [ts.SyntaxKind.EnumDeclaration]: (node, context) => {
      if (hasInlineTag(node)) {
        for (const member of node.members) {
          if (context.checker.getConstantValue(member) === undefined) {
            context.diagnostics.push(createNotConstantEnumMemberError(member, member.name.getText()));
          }
        }
      }

      return context.superTransformStatements(node);
    },
  },
};

export default plugin;
