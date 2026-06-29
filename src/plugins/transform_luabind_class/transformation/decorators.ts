import { type CallExpression, type Decorator, type Identifier } from "typescript";
import { type TransformationContext } from "typescript-to-lua";

import { LUABIND_DECORATOR } from "./constants";
import { unsupportedClassDecorator } from "./errors";

/**
 * Transform decorator call expressions for luabind class.
 *
 * @param context
 * @param decorator
 */
export function checkLuabindClassDecoratorExpression(context: TransformationContext, decorator: Decorator): void {
  const expression = decorator.expression;

  // Do not transform luabind decorator.
  if (((expression as CallExpression).expression as Identifier).text !== LUABIND_DECORATOR) {
    context.diagnostics.push(unsupportedClassDecorator(expression));
  }
}
