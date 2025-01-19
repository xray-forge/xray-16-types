import { Identifier, StringLiteral } from "typescript";

export function getIdentifierText(node: Identifier | StringLiteral): string {
  const text: string = node.getText();

  if (text.length > 2 && (text.startsWith('"') || text.startsWith("'"))) {
    return text.substring(1, text.length - 1);
  }

  return text;
}
