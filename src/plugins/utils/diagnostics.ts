import { DiagnosticCategory, getOriginalNode, type Node } from "typescript";
import { createSerialDiagnosticFactory } from "typescript-to-lua/dist/utils";

type MessageProvider<TArgs extends Array<any>> = string | ((...args: TArgs) => string);

/**
 * Create diagnostics factory to push errors when transpile lua to typescript.
 *
 * @param category
 * @param message
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
