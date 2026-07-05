import {
  type CallExpression,
  factory,
  type Identifier,
  type Node,
  type PropertyAccessExpression,
  SyntaxKind,
  type Type,
  type TypeChecker,
  type VariableDeclaration,
  type VariableDeclarationList,
} from "typescript";
import { type Plugin } from "typescript-to-lua";

import { isLuaLoggerEnabled } from "../utils/environment";

const LUA_LOGGER_STRIP_TARGET: string = "LuaLogger";
const ENGINE_MODULES: Array<string> = ["xray16", "xray16/alias"];

/**
 * Check whether a module specifier text (quotes included) points at a type-only engine module.
 *
 * @param moduleSpecifier - Module specifier node text, e.g. `"xray16/alias"`.
 * @returns Whether the module has no Lua runtime counterpart and its require can be dropped.
 */
function isEngineModule(moduleSpecifier: string): boolean {
  return ENGINE_MODULES.includes(moduleSpecifier.slice(1, -1));
}

/**
 * Configuration for the strip plugin, provided verbatim from the tsconfig `luaPlugins` entry.
 */
export interface IStripPluginConfig {
  /**
   * Remove `LuaLogger` declarations and calls from the runtime.
   * When unset, falls back to the `XR_NO_LUA_LOGS` env variable / `--no-lua-logs` CLI flag.
   */
  luaLogger?: boolean;
  /**
   * Remove imports and star re-exports of engine typedef modules (`xray16`, `xray16/alias`), which have no
   * runtime Lua counterpart and would otherwise emit dangling `require` calls. Defaults to `true`.
   */
  engineImports?: boolean;
}

/**
 * Create a plugin that strips selected constructs from the emitted Lua based on configuration.
 *
 * @param config - Selection of what should be stripped.
 * @returns Configured TypeScriptToLua plugin.
 */
export function createPlugin(config: IStripPluginConfig = {}): Plugin {
  const shouldStripLuaLogger = (): boolean => config.luaLogger ?? !isLuaLoggerEnabled();
  const shouldStripEngineImports: boolean = config.engineImports ?? true;

  return {
    visitors: {
      [SyntaxKind.ImportDeclaration]: (node, context) => {
        if (shouldStripEngineImports && isEngineModule(node.moduleSpecifier.getText())) {
          return undefined;
        }

        return context.superTransformStatements(node);
      },
      [SyntaxKind.ExportDeclaration]: (node, context) => {
        // Re-exports of type-only engine modules (e.g. `export * from "xray16/alias"`) emit a runtime
        // require loop with no counterpart Lua module; drop them.
        if (shouldStripEngineImports && node.moduleSpecifier !== undefined && isEngineModule(node.moduleSpecifier.getText())) {
          return undefined;
        }

        return context.superTransformStatements(node);
      },
      [SyntaxKind.VariableStatement]: (statement, context) => {
        if (shouldStripLuaLogger()) {
          let elementsCount: number = 0;
          const list = statement.declarationList as VariableDeclarationList;
          const nodes: Array<VariableDeclaration> = [];

          list.forEachChild((it: Node) => {
            const checker: TypeChecker = context.program.getTypeChecker();
            const typeSymbol: Type = checker.getTypeAtLocation(it);

            if (typeSymbol.symbol?.name === LUA_LOGGER_STRIP_TARGET) {
              // Nothing
            } else {
              nodes.push(it as VariableDeclaration);
            }

            elementsCount += 1;
          });

          if (nodes.length === 0) {
            return undefined;
          } else if (nodes.length !== elementsCount) {
            return context.superTransformStatements(
              factory.createVariableStatement(statement.modifiers, factory.updateVariableDeclarationList(list, nodes))
            );
          }
        }

        return context.superTransformStatements(statement);
      },
      [SyntaxKind.ExpressionStatement]: (statement, context) => {
        if (shouldStripLuaLogger() && statement.expression?.kind === SyntaxKind.CallExpression) {
          const expression: CallExpression = statement.expression as CallExpression;
          const propertyAccess: PropertyAccessExpression = expression.expression as PropertyAccessExpression;

          if (propertyAccess.expression?.kind === SyntaxKind.Identifier) {
            const checker: TypeChecker = context.program.getTypeChecker();
            const identifier: Identifier = propertyAccess.expression as Identifier;
            const typeSymbol: Type = checker.getTypeAtLocation(identifier);

            if (typeSymbol.symbol?.name === LUA_LOGGER_STRIP_TARGET) {
              return undefined;
            }
          }
        }

        return context.superTransformStatements(statement);
      },
    },
  };
}
