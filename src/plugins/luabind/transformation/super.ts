import {
  type CallExpression,
  type Expression,
  factory,
  isIdentifier,
  type SuperExpression,
  SyntaxKind,
} from "typescript";
import * as tstl from "typescript-to-lua";
import { isSymbolExported } from "typescript-to-lua/dist/transformation/utils/export";
import { getCalledExpression, transformArguments } from "typescript-to-lua/dist/transformation/visitors/call";
import { transformIdentifier } from "typescript-to-lua/dist/transformation/visitors/identifier";

import { type ITransformationContext } from "./class-declaration";
import {
  LUABIND_CONSTRUCTOR_METHOD,
  LUABIND_DEFAULT_SUPER_CALL,
  LUABIND_SUPER_IDENTIFIER,
  type TLuabindSuperCall,
} from "./constants";
import { isLuabindClassType } from "./utils";

/**
 * Transform generic methods super calls.
 * Example: super.parentMethod(first, second).
 *
 * @param expression - Super expression to transform.
 * @param context - Active transformation context.
 * @returns Lua expression referencing the base class.
 */
export function transformClassSuperMethodExpression(expression: Expression, context: ITransformationContext) {
  const superInfos = context.classSuperInfos;
  const superInfo = superInfos[superInfos.length - 1];

  if (!superInfo.classDeclaration || !isLuabindClassType(superInfo.classDeclaration, context)) {
    return context.superTransformExpression(expression);
  }

  const { extendedTypeNode } = superInfo;

  // Using `super` without extended type node is a TypeScript error
  const extendsExpression = extendedTypeNode?.expression;
  let baseClassName: tstl.AssignmentLeftHandSideExpression | undefined;

  if (extendsExpression && isIdentifier(extendsExpression)) {
    const symbol = context.checker.getSymbolAtLocation(extendsExpression);

    if (symbol && !isSymbolExported(context, symbol)) {
      // Use "baseClassName" if base is a simple identifier
      baseClassName = transformIdentifier(context, extendsExpression);
    }
  }

  if (!baseClassName) {
    throw new Error("Super without identifier - not supported with luabind.");
  }

  return baseClassName;
}

/**
 * Check if super() call is in luabind class target.
 *
 * @param expression - Call or super expression to check.
 * @param context - Active transformation context.
 * @returns True when the call targets a luabind class.
 */
export function isLuabindClassSuperCall(
  expression: CallExpression | SuperExpression,
  context: ITransformationContext
): boolean {
  const calledExpression: Expression = getCalledExpression(expression as CallExpression);

  if (calledExpression.kind !== SyntaxKind.SuperKeyword) {
    return false;
  } else {
    const superInfos = context.classSuperInfos;
    const superInfo = superInfos[superInfos.length - 1];

    // Handle super calls properly for luabind classes.
    return superInfo?.classDeclaration ? isLuabindClassType(superInfo.classDeclaration, context) : false;
  }
}

/**
 * Check if super.method() call is in luabind class target.
 *
 * @param expression - Call or super expression to check.
 * @param context - Active transformation context.
 * @returns True when the call targets a luabind class.
 */
export function isLuabindClassSuperMethodCall(
  expression: CallExpression | SuperExpression,
  context: ITransformationContext
): boolean {
  const superInfos = context.classSuperInfos;
  const superInfo = superInfos[superInfos.length - 1];

  // Handle super calls properly for luabind classes.
  return superInfo?.classDeclaration ? isLuabindClassType(superInfo.classDeclaration, context) : false;
}

/**
 * Transform a super() constructor call of a luabind class.
 *
 * Depending on the configured strategy this emits either a direct reference to the parent
 * constructor (`Base.__init(self, param)`) or a delegation to the luabind `super(param)` global.
 *
 * @param expression - Super constructor call to transform.
 * @param context - Active transformation context.
 * @param superCall - Strategy controlling how the parent constructor is invoked.
 * @returns Lua call to the base class constructor.
 */
export function transformLuabindConstructorSuperCall(
  expression: CallExpression,
  context: ITransformationContext,
  superCall: TLuabindSuperCall = LUABIND_DEFAULT_SUPER_CALL
) {
  const signature = context.checker.getResolvedSignature(expression);

  // Delegate to the luabind `super(...)` global, which binds `self` implicitly.
  if (superCall === "luabind") {
    return tstl.createCallExpression(
      tstl.createIdentifier(LUABIND_SUPER_IDENTIFIER),
      transformArguments(context, expression.arguments, signature),
      expression
    );
  }

  const parameters = transformArguments(context, expression.arguments, signature, factory.createThis());

  return tstl.createCallExpression(
    tstl.createTableIndexExpression(
      context.transformExpression(factory.createSuper()),
      tstl.createStringLiteral(LUABIND_CONSTRUCTOR_METHOD)
    ),
    parameters,
    expression
  );
}
