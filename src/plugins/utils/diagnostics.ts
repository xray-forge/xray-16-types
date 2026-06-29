import { DiagnosticCategory, getOriginalNode, type Node } from "typescript";
import { createSerialDiagnosticFactory } from "typescript-to-lua/dist/utils";

type MessageProvider<TArgs extends Array<any>> = string | ((...args: TArgs) => string);

/**
 * Create a factory that builds diagnostics for transformation errors.
 *
 * @param category - Severity assigned to produced diagnostics.
 * @param message - Static message or a function that builds it.
 * @returns Factory that creates a diagnostic for a given node.
 */
export function createDiagnosticFactory<TArgs extends Array<any>>(
  category: DiagnosticCategory,
  message: MessageProvider<TArgs>
) {
  return createSerialDiagnosticFactory((node: Node, ...args: TArgs) => ({
    file: getOriginalNode(node).getSourceFile(),
    start: getOriginalNode(node).getStart(),
    length: getOriginalNode(node).getWidth(),
    messageText: typeof message === "string" ? message : message(...args),
    category,
  }));
}

export function createErrorDiagnosticFactory<TArgs extends Array<any>>(message: MessageProvider<TArgs>) {
  return createDiagnosticFactory(DiagnosticCategory.Error, message);
}
