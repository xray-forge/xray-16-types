import * as ts from "typescript";
import { type Plugin } from "typescript-to-lua";

import {
  hasInlineTag,
  transformAccessExpression,
  transformIdentifierExpression,
  validateEnumDeclaration,
  validateTopLevelTags,
  validateVariableStatement,
} from "./transformation";

/**
 * Plugin that inlines compile-time constant values of `@inline` JSDoc tagged declarations.
 *
 * Supported targets are enums, module-level `as const` object literals and module-level scalar constants.
 * Values may be literals or expressions foldable on build time - arithmetic, string concatenation,
 * template literals and references to other constant declarations (enum members, const scalars,
 * `as const` object properties, whitelisted constants like 'math.pi').
 * Tagged declarations act as an explicit whitelist - member accesses are replaced with literal values in place,
 * while original tables are still emitted, so iteration / reverse mapping / whole-object usages keep working.
 * Tagged declarations that cannot be inlined produce build errors instead of silently emitting property lookups.
 */
const plugin: Plugin = {
  beforeTransform(program: ts.Program): Array<ts.Diagnostic> | void {
    // Force binder to assign node parents before any 'getJSDocTags' call,
    // otherwise empty results are computed for parent-less nodes and cached on them forever.
    program.getTypeChecker();

    const diagnostics: Array<ts.Diagnostic> = validateTopLevelTags(program);

    if (diagnostics.length > 0) {
      return diagnostics;
    }
  },
  visitors: {
    [ts.SyntaxKind.PropertyAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.ElementAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.Identifier]: transformIdentifierExpression,
    [ts.SyntaxKind.VariableStatement]: (statement, context) => {
      if (hasInlineTag(statement)) {
        validateVariableStatement(statement, context);
      }

      return context.superTransformStatements(statement);
    },
    [ts.SyntaxKind.EnumDeclaration]: (declaration, context) => {
      if (hasInlineTag(declaration)) {
        validateEnumDeclaration(declaration, context);
      }

      return context.superTransformStatements(declaration);
    },
  },
};

export default plugin;
