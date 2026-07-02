import * as ts from "typescript";
import type * as lua from "typescript-to-lua";

import { getContainingVariableStatement, hasAsConstAssertion, hasInlineTag, unwrapInitializer } from "./ast";
import {
  createForeignPropertyError,
  createNotAsConstObjectError,
  createNotConstantEnumMemberError,
  createNotConstError,
  createNotLiteralConstantError,
  createNotLiteralPropertyError,
  createNotModuleLevelError,
  createUnsupportedDeclarationError,
} from "./errors";
import { getComputedDeclarationValue } from "./evaluation";

/**
 * Validate `@inline` tagged variable statement and push diagnostics for not supported shapes.
 * Tagged statements must be module-level `const` declarations with compile-time computable scalars
 * or flat `as const` object literals.
 *
 * @param statement - Tagged variable statement to validate.
 * @param context - Transformation context.
 */
export function validateVariableStatement(statement: ts.VariableStatement, context: lua.TransformationContext): void {
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
      if (!hasAsConstAssertion(declaration.initializer)) {
        context.diagnostics.push(createNotAsConstObjectError(declaration, name));
        continue;
      }

      const type: ts.Type = context.checker.getTypeAtLocation(declaration);

      for (const property of type.getProperties()) {
        const propertyDeclaration: ts.Declaration | undefined = property.valueDeclaration;
        const sourceStatement: ts.VariableStatement | null =
          propertyDeclaration === undefined ? null : getContainingVariableStatement(propertyDeclaration);

        if (sourceStatement !== statement && (sourceStatement === null || !hasInlineTag(sourceStatement))) {
          context.diagnostics.push(createForeignPropertyError(propertyDeclaration ?? declaration, name, property.name));
        } else if (getComputedDeclarationValue(context.checker, property, new Set()) === null) {
          context.diagnostics.push(
            createNotLiteralPropertyError(propertyDeclaration ?? declaration, name, property.name)
          );
        }
      }
    } else {
      const symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(declaration.name);

      if (symbol === undefined || getComputedDeclarationValue(context.checker, symbol, new Set()) === null) {
        context.diagnostics.push(createNotLiteralConstantError(declaration, name));
      }
    }
  }
}

/**
 * Validate `@inline` tagged enum declaration and push diagnostics for members without constant values.
 *
 * @param declaration - Tagged enum declaration to validate.
 * @param context - Transformation context.
 */
export function validateEnumDeclaration(declaration: ts.EnumDeclaration, context: lua.TransformationContext): void {
  for (const member of declaration.members) {
    if (context.checker.getConstantValue(member) === undefined) {
      context.diagnostics.push(createNotConstantEnumMemberError(member, member.name.getText()));
    }
  }
}

/**
 * Scan program source files for `@inline` tags on unsupported declaration kinds.
 *
 * @param program - Program to scan.
 * @returns List of produced diagnostics.
 */
export function validateTopLevelTags(program: ts.Program): Array<ts.Diagnostic> {
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

  return diagnostics;
}
