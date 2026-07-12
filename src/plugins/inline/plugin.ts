import * as ts from "typescript";
import { type Plugin } from "typescript-to-lua";

import {
  collectVirtualDiagnostics,
  hasInlineTag,
  hasVirtualTag,
  prepareInlineCaptureImports,
  transformAccessExpression,
  transformCallExpression,
  transformExpressionStatement,
  transformIdentifierExpression,
  transformImportDeclaration,
  validateEnumDeclaration,
  validateTopLevelTags,
  validateVariableStatement,
} from "./transformation";

/**
 * Plugin that inlines declarations tagged with `@inline` or `@virtual`.
 *
 * Supported targets are enums, module-level `as const` object literals, module-level scalar constants, and functions
 * with one inlinable body. Constant values may use literals, arithmetic, string concatenation, template literals, and
 * references to other foldable constants.
 *
 * `@inline` replaces member accesses with literal values while still emitting the original declaration,
 * so iteration, reverse mapping, and whole-object usages keep working. Function calls inline when their body is a
 * single return expression, a void expression statement, or a guard `if`.
 *
 * `@virtual` includes `@inline` behavior and also erases the declaration from emitted output. Every
 * value reference must be computable at build time. Object spreads are expanded to table literals.
 * A `@virtual`-containing module may import, re-export, and hold runtime statements; its require is
 * only dropped when the module is provably side-effect free, so impure modules keep their load.
 *
 * Tagged declarations act as an explicit whitelist and produce build errors when they cannot be inlined.
 */
export const plugin: Plugin = {
  beforeTransform(program: ts.Program): Array<ts.Diagnostic> | void {
    // Force binder to assign node parents before any 'getJSDocTags' call,
    // otherwise empty results are computed for parent-less nodes and cached on them forever.
    program.getTypeChecker();
    prepareInlineCaptureImports(program);

    const diagnostics: Array<ts.Diagnostic> = [...validateTopLevelTags(program), ...collectVirtualDiagnostics(program)];

    if (diagnostics.length > 0) {
      return diagnostics;
    }
  },
  visitors: {
    [ts.SyntaxKind.PropertyAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.ElementAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.CallExpression]: transformCallExpression,
    [ts.SyntaxKind.ExpressionStatement]: transformExpressionStatement,
    [ts.SyntaxKind.Identifier]: transformIdentifierExpression,
    [ts.SyntaxKind.ImportDeclaration]: transformImportDeclaration,
    [ts.SyntaxKind.VariableStatement]: (statement, context) => {
      if (hasInlineTag(statement)) {
        validateVariableStatement(statement, context);

        if (hasVirtualTag(statement)) {
          return [];
        }
      }

      return context.superTransformStatements(statement);
    },
    [ts.SyntaxKind.EnumDeclaration]: (declaration, context) => {
      if (hasInlineTag(declaration)) {
        validateEnumDeclaration(declaration, context);

        if (hasVirtualTag(declaration)) {
          return [];
        }
      }

      return context.superTransformStatements(declaration);
    },
  },
};
