import { type AccessorDeclaration, getDecorators, type MethodDeclaration, type PropertyDeclaration } from "typescript";
import { type TransformationContext } from "typescript-to-lua";
import * as lua from "typescript-to-lua";
import { transformFunctionToExpression } from "typescript-to-lua/dist/transformation/visitors/function";
import { transformPropertyName } from "typescript-to-lua/dist/transformation/visitors/literal";

import { unsupportedMethodDecorator, unsupportedParameterDecorator, unsupportedStaticMethod } from "../errors";
import { isStaticNode } from "../utils";

export function transformMemberExpressionOwnerName(
  node: PropertyDeclaration | MethodDeclaration | AccessorDeclaration,
  className: lua.Identifier
): lua.Expression {
  return lua.cloneIdentifier(className);
}

export function transformMethodName(context: TransformationContext, node: MethodDeclaration): lua.Expression {
  const methodName = transformPropertyName(context, node.name);

  if (lua.isStringLiteral(methodName) && methodName.value === "toString") {
    return lua.createStringLiteral("__tostring", node.name);
  }

  return methodName;
}

export function transformMethodDeclaration(
  context: TransformationContext,
  node: MethodDeclaration,
  className: lua.Identifier
): lua.Statement | undefined {
  // Don't transform methods without body (overload declarations)
  if (!node.body) return;

  // Don't transform static methods for luabind classes.
  if (isStaticNode(node)) {
    context.diagnostics.push(unsupportedStaticMethod(node));

    return;
  }

  const methodTable = transformMemberExpressionOwnerName(node, className);
  const methodName = transformMethodName(context, node);
  const [functionExpression] = transformFunctionToExpression(context, node);

  return lua.createAssignmentStatement(
    lua.createTableIndexExpression(methodTable, methodName),
    functionExpression,
    node
  );
}

/**
 * Verify that a method does not use method or parameter decorators.
 *
 * @param context - Active transformation context.
 * @param node - Class method to inspect.
 */
export function verifyMethodDecoratingExpression(context: TransformationContext, node: MethodDeclaration): void {
  node.parameters.flatMap((parameter, index) => {
    const decorators = getDecorators(parameter);

    if (decorators?.length) {
      decorators.forEach((decorator) => {
        context.diagnostics.push(unsupportedParameterDecorator(decorator));
      });
    }
  });

  const decorators = getDecorators(node);

  if (decorators?.length) {
    decorators.forEach((decorator) => {
      context.diagnostics.push(unsupportedMethodDecorator(decorator));
    });
  }
}
