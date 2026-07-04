import {
  type CallExpression,
  type ClassDeclaration,
  type NewExpression,
  type SuperExpression,
  SyntaxKind,
} from "typescript";
import { type Plugin, type TransformationContext } from "typescript-to-lua";

import {
  isLuabindClassSuperCall,
  isLuabindClassSuperMethodCall,
  isLuabindClassType,
  isLuabindDecoratedClass,
  LUABIND_DEFAULT_SUPER_CALL,
  type ITransformationContext,
  type TLuabindSuperCall,
  transformClassSuperMethodExpression,
  transformLuabindClassDeclaration,
  transformLuabindConstructorSuperCall,
  transformNewCallExpression,
} from "./transformation";

/**
 * Configuration accepted by the transform_luabind_class plugin.
 *
 * The object is provided verbatim from the `tstl.luaPlugins` entry in the consumer tsconfig,
 * so any extra fields (like `name`/`import`) are ignored.
 */
export interface IPluginConfig {
  /**
   * Strategy used to transform parent constructor `super(...)` calls.
   *
   * - `reference` (default) - call the parent constructor directly: `Base.__init(self, ...)`.
   * - `luabind` - delegate to the luabind `super(...)` global.
   */
  superCall?: TLuabindSuperCall;
}

/**
 * Create the plugin that transforms TS classes marked with the luabind decorator to luabind class declarations.
 *
 * @param config - Optional plugin configuration provided by the tsconfig `luaPlugins` entry.
 * @returns Configured TypeScriptToLua plugin.
 */
export function createPlugin(config: IPluginConfig = {}): Plugin {
  const superCall: TLuabindSuperCall = config.superCall === "luabind" ? "luabind" : LUABIND_DEFAULT_SUPER_CALL;

  return {
    visitors: {
      [SyntaxKind.CallExpression]: (expression: CallExpression, context: TransformationContext) => {
        const ctx = context as ITransformationContext;

        if (isLuabindClassSuperCall(expression, ctx)) {
          return transformLuabindConstructorSuperCall(expression, ctx, superCall);
        }

        return ctx.superTransformExpression(expression);
      },
      [SyntaxKind.ClassDeclaration]: (declaration: ClassDeclaration, context: TransformationContext) => {
        const ctx = context as ITransformationContext;

        if (isLuabindDecoratedClass(declaration)) {
          return transformLuabindClassDeclaration(declaration, ctx, superCall);
        }

        return ctx.superTransformStatements(declaration);
      },
      [SyntaxKind.NewExpression]: (expression: NewExpression, context: TransformationContext) => {
        const ctx = context as ITransformationContext;

        if (isLuabindClassType(expression, ctx)) {
          return transformNewCallExpression(expression, ctx);
        }

        return ctx.superTransformExpression(expression);
      },
      [SyntaxKind.SuperKeyword]: (expression: SuperExpression, context: TransformationContext) => {
        const ctx = context as ITransformationContext;

        if (isLuabindClassSuperMethodCall(expression, ctx)) {
          return transformClassSuperMethodExpression(expression, ctx);
        }

        return ctx.superTransformExpression(expression);
      },
    },
  };
}
