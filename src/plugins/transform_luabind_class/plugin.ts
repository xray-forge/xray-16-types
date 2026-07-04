import { type CallExpression, type NewExpression, type SuperExpression, SyntaxKind } from "typescript";
import { type Plugin } from "typescript-to-lua";

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
export interface ITransformLuabindClassPluginConfig {
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
export function createTransformLuabindClassPlugin(config: ITransformLuabindClassPluginConfig = {}): Plugin {
  const superCall: TLuabindSuperCall = config.superCall === "luabind" ? "luabind" : LUABIND_DEFAULT_SUPER_CALL;

  return {
    visitors: {
      [SyntaxKind.CallExpression]: (expression: CallExpression, context: ITransformationContext) => {
        if (isLuabindClassSuperCall(expression, context)) {
          return transformLuabindConstructorSuperCall(expression, context, superCall);
        }

        return context.superTransformExpression(expression);
      },
      [SyntaxKind.ClassDeclaration]: (declaration, context: ITransformationContext) => {
        if (isLuabindDecoratedClass(declaration)) {
          return transformLuabindClassDeclaration(declaration, context, superCall);
        }

        return context.superTransformStatements(declaration);
      },
      [SyntaxKind.NewExpression]: (expression: NewExpression, context: ITransformationContext) => {
        if (isLuabindClassType(expression, context)) {
          return transformNewCallExpression(expression, context);
        }

        return context.superTransformExpression(expression);
      },
      [SyntaxKind.SuperKeyword]: (expression: SuperExpression, context: ITransformationContext) => {
        if (isLuabindClassSuperMethodCall(expression, context)) {
          return transformClassSuperMethodExpression(expression, context);
        }

        return context.superTransformExpression(expression);
      },
    },
  };
}

/**
 * Plugin default export.
 *
 * TypeScriptToLua treats a function default export as a factory and invokes it with the tsconfig
 * `luaPlugins` entry, so the plugin is configured via that entry (e.g. `{ "name": "...", "superCall": "luabind" }`).
 */
export default createTransformLuabindClassPlugin;
