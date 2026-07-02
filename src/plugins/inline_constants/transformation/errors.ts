import { createErrorDiagnosticFactory } from "../../utils/diagnostics";

import { INLINE_TAG } from "./constants";

export const createUnsupportedDeclarationError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' is supported only for enums and module-level 'const' declarations.`
);

export const createNotModuleLevelError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' declarations must be module-level statements.`
);

export const createNotConstError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' declarations must use 'const' keyword.`
);

export const createNotAsConstObjectError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' object '${name}' must use 'as const' assertion.`
);

export const createNotLiteralConstantError = createErrorDiagnosticFactory(
  (name: string) =>
    `'@${INLINE_TAG}' constant '${name}' must have a compile-time constant value, ` +
    "use a literal or an expression computable on build time."
);

export const createNotLiteralPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' must have a compile-time constant value, ` +
    "use a literal or an expression computable on build time."
);

export const createForeignPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' is declared outside of '@${INLINE_TAG}' statements, ` +
    `mark the source declaration with '@${INLINE_TAG}' too.`
);

export const createNotConstantEnumMemberError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' enum member '${name}' must have a compile-time constant value.`
);
