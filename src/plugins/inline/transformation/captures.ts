import * as ts from "typescript";

import { isValueUsagePosition } from "./ast";
import { resolveMemberSymbol, tryGetInlineValue } from "./evaluation";
import { resolveAliasedSymbol } from "./virtual";

let requiredCaptureImports: WeakMap<ts.SourceFile, Set<ts.Symbol>> = new WeakMap();

/**
 * A module-level runtime binding referenced by an inline body.
 */
export interface IInlineCapture {
  /** Canonical symbol of the captured binding. */
  symbol: ts.Symbol;
  /** Name used by the inline declaration, for diagnostics. */
  name: string;
}

/**
 * Bindings available in a caller for the captures needed by an inline body.
 */
export interface IInlineCaptureBindings {
  /** Replacements from captured declaration symbols to caller import identifiers. */
  substitutions: Map<ts.Symbol, ts.Identifier>;
  /** Captures that the caller cannot provide. */
  missing: Array<IInlineCapture>;
}

/**
 * Check whether a declaration is nested below a node.
 *
 * @param declaration - Declaration to inspect.
 * @param ancestor - Potential ancestor node.
 * @returns Whether declaration belongs to the subtree.
 */
function isNestedIn(declaration: ts.Declaration, ancestor: ts.Node): boolean {
  let current: ts.Node | undefined = declaration;

  while (current !== undefined) {
    if (current === ancestor) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

/**
 * Check whether a symbol denotes an ambient runtime global instead of a module-local binding.
 *
 * @param symbol - Canonical symbol to inspect.
 * @returns Whether the symbol is declared in a declaration file.
 */
function isAmbientRuntimeSymbol(symbol: ts.Symbol): boolean {
  return symbol.declarations?.every((it) => it.getSourceFile().isDeclarationFile) ?? false;
}

/**
 * Check whether an identifier is the object part of an access that will be folded by the inline plugin.
 *
 * A tagged object itself is not a scalar inline value, but a tagged `as const` property can be. Capture analysis
 * must inspect the complete access so cross-module inlining does not require a runtime import for a literal value.
 *
 * @param checker - Program type checker.
 * @param node - Identifier considered for capture.
 * @returns Whether the enclosing property or element access is compile-time inlineable.
 */
function isInlineableAccessBase(checker: ts.TypeChecker, node: ts.Identifier): boolean {
  const parent: ts.Node | undefined = node.parent;

  if (
    (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) &&
    parent.expression === node
  ) {
    const member: ts.Symbol | null = resolveMemberSymbol(checker, parent);

    return member !== null && tryGetInlineValue(checker, member) !== null;
  }

  return false;
}

/**
 * Collect free runtime bindings referenced by an inline body.
 *
 * @param checker - Program type checker.
 * @param declaration - Inline function declaration.
 * @param body - Expression or guard statement to be spliced.
 * @returns Unique captured runtime bindings.
 */
export function getInlineCaptures(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  body: ts.Node
): Array<IInlineCapture> {
  const parameterSymbols: Set<ts.Symbol> = new Set();
  const captures: Map<ts.Symbol, IInlineCapture> = new Map();

  for (const parameter of declaration.parameters) {
    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(parameter.name);

    if (symbol !== undefined) {
      parameterSymbols.add(symbol);
    }
  }

  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && isValueUsagePosition(node)) {
      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

      if (symbol !== undefined && !parameterSymbols.has(symbol) && !isInlineableAccessBase(checker, node)) {
        const resolved: ts.Symbol = resolveAliasedSymbol(checker, symbol);
        const valueDeclaration: ts.Declaration | undefined = resolved.valueDeclaration;

        if (
          valueDeclaration !== undefined &&
          !isNestedIn(valueDeclaration, declaration) &&
          !isAmbientRuntimeSymbol(resolved) &&
          tryGetInlineValue(checker, resolved) === null
        ) {
          captures.set(resolved, { symbol: resolved, name: node.text });
        }
      }
    }

    node.forEachChild(visit);
  };

  visit(body);

  return [...captures.values()];
}

/**
 * Find the runtime named import in a caller that resolves to a captured symbol.
 *
 * @param checker - Program type checker.
 * @param sourceFile - Caller source file.
 * @param target - Captured symbol to find.
 * @returns Caller import identifier, or null when unavailable.
 */
function findCallerImport(checker: ts.TypeChecker, sourceFile: ts.SourceFile, target: ts.Symbol): ts.Identifier | null {
  for (const statement of sourceFile.statements) {
    const clause: ts.ImportClause | undefined = ts.isImportDeclaration(statement) ? statement.importClause : undefined;

    if (
      clause === undefined ||
      clause.isTypeOnly ||
      clause.namedBindings === undefined ||
      !ts.isNamedImports(clause.namedBindings)
    ) {
      continue;
    }

    for (const specifier of clause.namedBindings.elements) {
      if (specifier.isTypeOnly) {
        continue;
      }

      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(specifier.name);

      if (symbol !== undefined && resolveAliasedSymbol(checker, symbol) === target) {
        return specifier.name;
      }
    }
  }

  return null;
}

/**
 * Resolve caller bindings required to splice an inline body.
 *
 * @param checker - Program type checker.
 * @param declaration - Inline function declaration.
 * @param body - Expression or guard statement to be spliced.
 * @param caller - Source file containing the call site.
 * @returns Capture substitutions and any unavailable captures.
 */
export function getInlineCaptureBindings(
  checker: ts.TypeChecker,
  declaration: ts.FunctionDeclaration,
  body: ts.Node,
  caller: ts.SourceFile
): IInlineCaptureBindings {
  if (declaration.getSourceFile() === caller) {
    return { substitutions: new Map(), missing: [] };
  }

  const substitutions: Map<ts.Symbol, ts.Identifier> = new Map();
  const missing: Array<IInlineCapture> = [];

  for (const capture of getInlineCaptures(checker, declaration, body)) {
    const binding: ts.Identifier | null = findCallerImport(checker, caller, capture.symbol);

    if (binding === null) {
      missing.push(capture);
    } else {
      substitutions.set(capture.symbol, binding);
    }
  }

  return { substitutions, missing };
}

/**
 * Reset the per-program capture-import plan before transformation starts.
 */
export function resetRequiredCaptureImports(): void {
  requiredCaptureImports = new WeakMap();
}

/**
 * Mark imported caller bindings that must survive TypeScriptToLua import pruning.
 *
 * @param sourceFile - Caller source file.
 * @param bindings - Capture substitutions used by one inline call.
 */
export function requireInlineCaptureImports(sourceFile: ts.SourceFile, bindings: Map<ts.Symbol, ts.Identifier>): void {
  let required: Set<ts.Symbol> | undefined = requiredCaptureImports.get(sourceFile);

  if (required === undefined) {
    required = new Set();
    requiredCaptureImports.set(sourceFile, required);
  }

  for (const symbol of bindings.keys()) {
    required.add(symbol);
  }
}

/**
 * Check whether an import binding is required solely by a spliced inline body.
 *
 * @param checker - Program type checker.
 * @param sourceFile - Importing source file.
 * @param symbol - Import alias symbol.
 * @returns Whether the import needs a generated Lua local binding.
 */
export function isRequiredInlineCaptureImport(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  symbol: ts.Symbol
): boolean {
  return requiredCaptureImports.get(sourceFile)?.has(resolveAliasedSymbol(checker, symbol)) ?? false;
}
