import * as ts from "typescript";
import * as lua from "typescript-to-lua";
import { type Plugin } from "typescript-to-lua";
import { validateAssignment } from "typescript-to-lua/dist/transformation/utils/assignment-validation";
import { transformInPrecedingStatementScope } from "typescript-to-lua/dist/transformation/utils/preceding-statements";
import { checkOnlyTruthyCondition } from "typescript-to-lua/dist/transformation/visitors/conditional";
import { isMultiReturnType } from "typescript-to-lua/dist/transformation/visitors/language-extensions/multi";
import { createReturnStatement } from "typescript-to-lua/dist/transformation/visitors/return";

function getConditionalExpression(expression: ts.Expression): ts.ConditionalExpression | null {
  let current: ts.Expression = expression;

  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }

  return ts.isConditionalExpression(current) ? current : null;
}

function hasMultiReturnBranch(context: lua.TransformationContext, expression: ts.ConditionalExpression): boolean {
  return (
    isMultiReturnType(context.checker.getTypeAtLocation(expression.whenTrue)) ||
    isMultiReturnType(context.checker.getTypeAtLocation(expression.whenFalse))
  );
}

function transformExpressionToReturnStatements(
  context: lua.TransformationContext,
  statement: ts.ReturnStatement,
  expression: ts.Expression
): Array<lua.Statement> {
  const conditionalExpression: ts.ConditionalExpression | null = getConditionalExpression(expression);

  if (conditionalExpression !== null && !hasMultiReturnBranch(context, conditionalExpression)) {
    return transformConditionalReturnStatement(context, statement, conditionalExpression);
  }

  const value = transformInPrecedingStatementScope(context, () => context.transformExpression(expression));

  return [...value.precedingStatements, createReturnStatement(context, [value.result], statement)];
}

function transformConditionalReturnStatement(
  context: lua.TransformationContext,
  statement: ts.ReturnStatement,
  expression: ts.ConditionalExpression
): Array<lua.Statement> {
  checkOnlyTruthyCondition(expression.condition, context);

  const condition = transformInPrecedingStatementScope(context, () =>
    context.transformExpression(expression.condition)
  );
  const whenTrue: Array<lua.Statement> = transformExpressionToReturnStatements(context, statement, expression.whenTrue);
  const whenFalse: Array<lua.Statement> = transformExpressionToReturnStatements(
    context,
    statement,
    expression.whenFalse
  );

  return [
    ...condition.precedingStatements,
    lua.createIfStatement(condition.result, lua.createBlock(whenTrue), lua.createBlock(whenFalse), expression),
  ];
}

/**
 * Plugin that rewrites returned ternary expressions as direct branch returns.
 */
export const plugin: Plugin = {
  visitors: {
    [ts.SyntaxKind.ReturnStatement]: (statement, context) => {
      if (statement.expression === undefined) {
        return context.superTransformStatements(statement);
      }

      const expression: ts.ConditionalExpression | null = getConditionalExpression(statement.expression);

      if (expression === null || hasMultiReturnBranch(context, expression)) {
        return context.superTransformStatements(statement);
      }

      const expressionType: ts.Type = context.checker.getTypeAtLocation(statement.expression);
      const returnType: ts.Type | undefined = context.checker.getContextualType(statement.expression);

      if (returnType !== undefined) {
        validateAssignment(context, statement, expressionType, returnType);
      }

      return transformConditionalReturnStatement(context, statement, expression);
    },
  },
};
