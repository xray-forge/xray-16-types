import {
  type ClassLikeDeclaration,
  type ClassLikeDeclarationBase,
  type Expression,
  type ExpressionWithTypeArguments,
  getDecorators,
  type HasModifiers,
  type HeritageClause,
  SyntaxKind,
  type Type,
} from "typescript";
import { type TransformationContext } from "typescript-to-lua";

import { LUABIND_DECORATOR, LUABIND_SYMBOL } from "./constants";

/**
 * Whether a method or field is static.
 *
 * @param node - Node with modifiers to check.
 * @returns True when the node is marked static.
 */
export function isStaticNode(node: HasModifiers): boolean {
  return node.modifiers?.some((m) => m.kind === SyntaxKind.StaticKeyword) === true;
}

/**
 * Get class extends node.
 *
 * @param node - Class declaration to read.
 * @returns Extends clause of the class, if any.
 */
export function getExtendsClause(node: ClassLikeDeclarationBase): HeritageClause | undefined {
  return node.heritageClauses?.find((clause) => clause.token === SyntaxKind.ExtendsKeyword);
}

/**
 * Get class extended node.
 *
 * @param node - Class declaration to read.
 * @returns First extended type node, if any.
 */
export function getExtendedNode(node: ClassLikeDeclarationBase): ExpressionWithTypeArguments | undefined {
  const extendsClause = getExtendsClause(node);

  if (!extendsClause) return;

  return extendsClause.types[0];
}

/**
 * Get the resolved type of the extended class.
 *
 * @param context - Active transformation context.
 * @param node - Class declaration to read.
 * @returns Resolved type of the extended class, if any.
 */
export function getExtendedType(context: TransformationContext, node: ClassLikeDeclarationBase): Type | undefined {
  const extendedNode = getExtendedNode(node);

  return extendedNode && context.checker.getTypeAtLocation(extendedNode);
}

/**
 * Check if class is decorated with provided decorator name.
 *
 * @param declaration - Class declaration to inspect.
 * @returns True when the class carries the luabind decorator.
 */
export function isLuabindDecoratedClass(declaration: ClassLikeDeclaration): boolean {
  const decorators = getDecorators(declaration);

  if (!decorators) {
    return false;
  }

  return decorators.some((it) => (it.expression as unknown as any).expression?.escapedText === LUABIND_DECORATOR);
}

/**
 * Mark provided class as Luabind target.
 *
 * @param declaration - Class declaration to mark.
 * @param context Active transformation context.
 */
export function markTypeAsLuabind(declaration: ClassLikeDeclaration, context: TransformationContext): void {
  const typeAtLocation = context.checker.getTypeAtLocation(declaration);
  const typeSymbol = typeAtLocation.symbol || typeAtLocation.aliasSymbol;

  (typeSymbol as {})[LUABIND_SYMBOL] = true;
}

/**
 * Check if provided class is specified as LuaBind.
 *
 * @param declaration - Class declaration or expression to inspect.
 * @param context - Active transformation context.
 * @returns True when the class is a luabind target.
 */
export function isLuabindClassType(
  declaration: Expression | ClassLikeDeclaration,
  context: TransformationContext
): boolean {
  const typeAtLocation = context.checker.getTypeAtLocation(declaration);
  const typeSymbol = typeAtLocation.symbol || typeAtLocation.aliasSymbol;

  if (typeSymbol) {
    const isMarked = (typeSymbol as {})[LUABIND_SYMBOL] === true;

    if (isMarked) {
      return true;
    } else {
      return isLuabindDecoratedClass(typeSymbol.declarations[0] as ClassLikeDeclaration);
    }
  } else {
    return false;
  }
}
