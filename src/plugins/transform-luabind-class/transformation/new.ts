import { type NewExpression } from "typescript";
import * as tstl from "typescript-to-lua";
import { transformArguments } from "typescript-to-lua/dist/transformation/visitors/call";

import { type ITransformationContext } from "./index";

/**
 * Transform a new expression into a luabind constructor call.
 *
 * @param expression - New expression to transform.
 * @param context - Active transformation context.
 * @returns Lua call expression for the class constructor.
 */
export function transformNewCallExpression(expression: NewExpression, context: ITransformationContext) {
  return tstl.createCallExpression(
    context.transformExpression(expression.expression),
    transformArguments(context, expression.arguments ?? [])
  );
}
