import { CallExpression, Decorator, Identifier } from "typescript";
import { TransformationContext } from "typescript-to-lua";

import { LUABIND_DECORATOR } from "./constants";
import { unsupportedClassDecorator } from "./errors";

/**
 * Transform decorator call expressions for luabind class.
 */
export function checkLuabindClassDecoratorExpression(context: TransformationContext, decorator: Decorator) {
  const expression = decorator.expression;

  // Do not transform luabind decorator.
  if (((expression as CallExpression).expression as Identifier).text !== LUABIND_DECORATOR) {
    context.diagnostics.push(unsupportedClassDecorator(expression));
  }
}
