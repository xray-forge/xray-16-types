import { createErrorDiagnosticFactory } from "../../utils/diagnostics";

import { INLINE_MACRO, INLINE_TAG, NO_INLINE_MACRO, VIRTUAL_TAG } from "./constants";

export const createUnsupportedDeclarationError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' and '@${VIRTUAL_TAG}' are supported only for enums, module-level 'const' declarations ` +
    "and functions."
);

export const createNotInlinableFunctionError = createErrorDiagnosticFactory(
  (name: string) =>
    `'@${INLINE_TAG}' function '${name}' must have a single 'return <expression>' or 'void' expression-statement ` +
    "body, or a single 'if (condition) { ... }' guard statement, and only plain parameters (a trailing rest is " +
    "allowed for guards; no destructuring) to be inlinable."
);

export const createVirtualValueReferenceError = createErrorDiagnosticFactory(
  (name: string) =>
    `'@${VIRTUAL_TAG}' declaration '${name}' is referenced as a value and cannot be erased, ` +
    `demote it to '@${INLINE_TAG}' or make the reference computable at build time.`
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
    "use a literal or an expression computable at build time."
);

export const createNotLiteralPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' must have a compile-time constant value, ` +
    "use a literal or an expression computable at build time."
);

export const createForeignPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' is declared outside of '@${INLINE_TAG}' statements, ` +
    `mark the source declaration with '@${INLINE_TAG}' too.`
);

export const createNotConstantEnumMemberError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' enum member '${name}' must have a compile-time constant value.`
);

export const createInvalidOverrideMacroError = createErrorDiagnosticFactory(
  (name: string) => `'${name}' macro expects exactly 1 argument.`
);

export const createInlineMacroTargetError = createErrorDiagnosticFactory(
  `'${INLINE_MACRO}' target must be a call to a module-level function declaration ` +
    "or an expression computable at build time."
);

export const createInlineMacroFunctionError = createErrorDiagnosticFactory(
  (name: string) =>
    `'${INLINE_MACRO}' function '${name}' must have a single 'return <expression>' or 'void' expression-statement ` +
    "body, or a single 'if (condition) { ... }' guard statement, and only plain parameters (a trailing rest is " +
    "allowed for guards; no destructuring) to be inlinable."
);

export const createInlineMacroCallSiteError = createErrorDiagnosticFactory(
  (name: string) =>
    `'${INLINE_MACRO}' call to '${name}' cannot be inlined at this call site - 'void' and guard bodies inline ` +
    "only at statement position, and parameters used repeatedly must receive side-effect free arguments."
);

export const createInlineCaptureError = createErrorDiagnosticFactory(
  (functionName: string, captureName: string) =>
    `Cannot inline function '${functionName}': its body captures runtime value '${captureName}', ` +
    "which this module does not import."
);

export const createNoInlineVirtualError = createErrorDiagnosticFactory(
  (name: string) =>
    `'${NO_INLINE_MACRO}' cannot reference '@${VIRTUAL_TAG}' declaration '${name}' - virtual declarations are ` +
    `erased from emitted output, demote the declaration to '@${INLINE_TAG}' to keep a runtime value.`
);
