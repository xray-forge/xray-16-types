import { type AccessorDeclaration, canHaveDecorators, getDecorators, type PropertyDeclaration } from "typescript";
import { type TransformationContext } from "typescript-to-lua";
import * as tstl from "typescript-to-lua";
import { createSelfIdentifier } from "typescript-to-lua/dist/transformation/utils/lua-ast";
import { transformInPrecedingStatementScope } from "typescript-to-lua/dist/transformation/utils/preceding-statements";
import { transformPropertyName } from "typescript-to-lua/dist/transformation/visitors/literal";

import { unsupportedPropertyDecorator } from "../errors";

/**
 * Verify whether decorators provided for luabind class.
 *
 * @param context - Active transformation context.
 * @param node - Class property or accessor to inspect.
 */
export function verifyPropertyDecoratingExpression(
  context: TransformationContext,
  node: PropertyDeclaration | AccessorDeclaration
): void {
  if (!canHaveDecorators(node)) return;

  const decorators = getDecorators(node);

  if (!decorators) return;

  decorators.forEach((decorator) => {
    context.diagnostics.push(unsupportedPropertyDecorator(decorator));
  });
}

export function transformClassInstanceFields(
  context: TransformationContext,
  instanceFields: Array<PropertyDeclaration>
): Array<tstl.Statement> {
  const statements: Array<tstl.Statement> = [];

  for (const f of instanceFields) {
    const { precedingStatements, result: statement } = transformInPrecedingStatementScope(context, () => {
      // Get identifier
      const fieldName = transformPropertyName(context, f.name);

      const value = f.initializer ? context.transformExpression(f.initializer) : undefined;

      // Self[fieldName]
      const selfIndex = tstl.createTableIndexExpression(createSelfIdentifier(), fieldName);

      // Self[fieldName] = value
      const assignClassField = tstl.createAssignmentStatement(selfIndex, value, f);

      return assignClassField;
    });

    statements.push(...precedingStatements, statement);
  }

  return statements;
}
