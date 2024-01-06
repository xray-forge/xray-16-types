import * as path from "path";

import { SyntaxKind } from "typescript";
import { createStringLiteral, Plugin } from "typescript-to-lua";

const FILENAME_IDENTIFIER: string = "$filename";
const DIRNAME_IDENTIFIER: string = "$dirname";

/**
 * Plugin that injects FILE_NAME in compile-time.
 */
const plugin: Plugin = {
  visitors: {
    [SyntaxKind.Identifier]: (node, context) => {
      if (node.text === FILENAME_IDENTIFIER) {
        return createStringLiteral(path.parse(context.sourceFile.fileName).name);
      }

      if (node.text === DIRNAME_IDENTIFIER) {
        return createStringLiteral(path.basename(path.dirname(context.sourceFile.fileName)));
      }

      return context.superTransformExpression(node);
    },
  },
};

export default plugin;
