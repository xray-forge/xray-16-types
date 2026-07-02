import * as ts from "typescript";

import { getContainingVariableStatement, hasInlineTag, hasVirtualTag, isValueUsagePosition } from "./ast";
import { type TFoldedValue } from "./constants";
import { createImpureVirtualModuleError, createVirtualValueReferenceError } from "./errors";
import { isComputableEnumMember, resolveMemberSymbol, tryGetInlineValue } from "./evaluation";

const modulePurityCache: WeakMap<ts.SourceFile, boolean> = new WeakMap();

/**
 * Resolve a symbol through import aliases.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to resolve.
 * @returns Resolved symbol.
 */
export function resolveAliasedSymbol(checker: ts.TypeChecker, symbol: ts.Symbol): ts.Symbol {
  return (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(symbol) : symbol;
}

/**
 * Get the `@virtual` declaration behind the provided symbol, if any.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to check.
 * @returns Virtual tagged variable statement, enum declaration, or null.
 */
export function getVirtualDeclaration(
  checker: ts.TypeChecker,
  symbol: ts.Symbol
): ts.VariableStatement | ts.EnumDeclaration | null {
  const declaration: ts.Declaration | undefined = resolveAliasedSymbol(checker, symbol).valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumDeclaration(declaration)) {
    return hasVirtualTag(declaration) ? declaration : null;
  }

  if (ts.isVariableDeclaration(declaration)) {
    const statement: ts.VariableStatement | null = getContainingVariableStatement(declaration);

    return statement !== null && hasVirtualTag(statement) ? statement : null;
  }

  return null;
}

/**
 * Check whether an access expression that references a tagged symbol is erasable.
 * An access is erasable when the access itself inlines, a member access on it inlines,
 * or it is an object spread that can be expanded.
 *
 * @param checker - Program type checker.
 * @param access - Access expression referencing the symbol.
 * @param symbol - Referenced tagged symbol.
 * @param isVirtualSpreadAllowed - Whether object spread positions count as erasable.
 * @returns Whether the access is erasable.
 */
function isErasableAccess(
  checker: ts.TypeChecker,
  access: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  symbol: ts.Symbol,
  isVirtualSpreadAllowed: boolean
): boolean {
  if (tryGetInlineValue(checker, resolveAliasedSymbol(checker, symbol)) !== null) {
    return true;
  }

  const parent: ts.Node | undefined = access.parent;

  if (parent === undefined) {
    return false;
  }

  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === access) {
    const member: ts.Symbol | null = resolveMemberSymbol(checker, parent);

    return member !== null && tryGetInlineValue(checker, member) !== null;
  }

  return ts.isSpreadAssignment(parent) && isVirtualSpreadAllowed;
}

/**
 * Check whether an identifier reference to a tagged declaration is erasable.
 * Erasable references are inlined, expanded, or stripped during transformation.
 *
 * @param checker - Program type checker.
 * @param node - Identifier reference to check.
 * @param symbol - Resolved symbol of the identifier.
 * @param isVirtualSpreadAllowed - Whether object spread positions count as erasable.
 * @returns Whether the reference is erasable.
 */
export function isErasableReference(
  checker: ts.TypeChecker,
  node: ts.Identifier,
  symbol: ts.Symbol,
  isVirtualSpreadAllowed: boolean
): boolean {
  const parent: ts.Node | undefined = node.parent;

  if (parent === undefined || ts.isPartOfTypeNode(node)) {
    return true;
  }

  // In a type query such as 'typeof values', the entity name is not itself a type node:
  if (ts.isTypeQueryNode(parent) || ts.isQualifiedName(parent)) {
    return true;
  }

  // Own declaration names and import binding positions are stripped, not referenced:
  if (
    (ts.isVariableDeclaration(parent) && parent.name === node) ||
    (ts.isEnumDeclaration(parent) && parent.name === node) ||
    ts.isImportSpecifier(parent) ||
    ts.isImportClause(parent) ||
    ts.isNamespaceImport(parent)
  ) {
    return true;
  }

  // In a namespace-qualified reference such as 'constants.value', the enclosing access is the real reference:
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) {
    return isErasableAccess(checker, parent, symbol, isVirtualSpreadAllowed);
  }

  // Member access with build-time computable result gets inlined:
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) {
    const member: ts.Symbol | null = resolveMemberSymbol(checker, parent);

    return member !== null && tryGetInlineValue(checker, member) !== null;
  }

  // Object spreads of virtual objects are expanded to literal entries:
  if (ts.isSpreadAssignment(parent)) {
    return isVirtualSpreadAllowed;
  }

  // Scalar constants get inlined in plain value positions:
  return isValueUsagePosition(node) && tryGetInlineValue(checker, resolveAliasedSymbol(checker, symbol)) !== null;
}

/**
 * Check whether a statement is ambient (`declare`). Ambient statements produce no runtime output.
 *
 * @param statement - Statement to check.
 * @returns Whether statement is ambient.
 */
function isAmbientStatement(statement: ts.Statement): boolean {
  return (
    ts.canHaveModifiers(statement) &&
    (ts.getModifiers(statement)?.some((it) => it.kind === ts.SyntaxKind.DeclareKeyword) ?? false)
  );
}

/**
 * Check whether an import declaration binds only types, either through syntax or through resolved symbols.
 *
 * @param checker - Program type checker.
 * @param statement - Import declaration to check.
 * @returns Whether import produces no runtime bindings.
 */
function isTypeOnlyImport(checker: ts.TypeChecker, statement: ts.ImportDeclaration): boolean {
  const clause: ts.ImportClause | undefined = statement.importClause;

  if (clause === undefined) {
    return false;
  }

  if (clause.isTypeOnly) {
    return true;
  }

  if (clause.name !== undefined || clause.namedBindings === undefined || !ts.isNamedImports(clause.namedBindings)) {
    return false;
  }

  return clause.namedBindings.elements.every((specifier) => {
    if (specifier.isTypeOnly) {
      return true;
    }

    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(specifier.name);

    return symbol !== undefined && (resolveAliasedSymbol(checker, symbol).flags & ts.SymbolFlags.Value) === 0;
  });
}

/**
 * Check whether an import references an ambient module like 'xray16'.
 * Ambient modules describe engine-provided globals, so importing them has no script side effects.
 *
 * @param checker - Program type checker.
 * @param statement - Import declaration to check.
 * @returns Whether the import references an ambient module.
 */
function isAmbientModuleImport(checker: ts.TypeChecker, statement: ts.ImportDeclaration): boolean {
  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(statement.moduleSpecifier);

  return symbol?.declarations?.some((it) => ts.isModuleDeclaration(it)) ?? false;
}

/**
 * Resolve the source file for a module referenced by an import or export declaration specifier.
 *
 * @param checker - Program type checker.
 * @param moduleSpecifier - Module specifier expression.
 * @returns Resolved source file or null.
 */
export function resolveModuleSourceFile(checker: ts.TypeChecker, moduleSpecifier: ts.Expression): ts.SourceFile | null {
  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(moduleSpecifier);
  const declaration: ts.Declaration | undefined = symbol?.valueDeclaration;

  return declaration !== undefined && ts.isSourceFile(declaration) ? declaration : null;
}

/**
 * Check whether a module has no side effects on load. This silent analysis decides whether a require can be dropped.
 * Pure modules contain only type-only imports, tagged constants, constant enums, types and
 * imports or re-exports of other pure modules, including barrel files.
 *
 * @param checker - Program type checker.
 * @param sourceFile - Module source file to check.
 * @param seen - Modules on current resolution path, guards from circular imports.
 * @returns Whether module load has no side effects.
 */
export function isPureConstantsModule(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  seen: Set<ts.SourceFile> = new Set()
): boolean {
  const cached: boolean | undefined = modulePurityCache.get(sourceFile);

  if (cached !== undefined) {
    return cached;
  }

  if (seen.has(sourceFile)) {
    return true;
  }

  seen.add(sourceFile);

  const result: boolean = sourceFile.statements.every((statement) => {
    if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement) || isAmbientStatement(statement)) {
      return true;
    }

    if (ts.isVariableStatement(statement)) {
      return hasInlineTag(statement);
    }

    if (ts.isEnumDeclaration(statement)) {
      return statement.members.every((member) => isComputableEnumMember(checker, member));
    }

    if (ts.isImportDeclaration(statement)) {
      if (isTypeOnlyImport(checker, statement) || isAmbientModuleImport(checker, statement)) {
        return true;
      }

      const target: ts.SourceFile | null = resolveModuleSourceFile(checker, statement.moduleSpecifier);

      return target !== null && isPureConstantsModule(checker, target, seen);
    }

    if (ts.isExportDeclaration(statement)) {
      if (statement.isTypeOnly) {
        return true;
      }

      if (statement.moduleSpecifier === undefined) {
        return true;
      }

      const target: ts.SourceFile | null = resolveModuleSourceFile(checker, statement.moduleSpecifier);

      return target !== null && isPureConstantsModule(checker, target, seen);
    }

    return false;
  });

  seen.delete(sourceFile);
  modulePurityCache.set(sourceFile, result);

  return result;
}

/**
 * Validate strict purity for a module containing `@virtual` declarations.
 * This is stricter than silent analysis: value imports and value re-exports are rejected even from pure modules,
 * so erasing requires to this module can never silently drop transitive loads.
 *
 * @param checker - Program type checker.
 * @param sourceFile - Module source file to validate.
 * @returns List of produced diagnostics.
 */
export function validateVirtualModulePurity(checker: ts.TypeChecker, sourceFile: ts.SourceFile): Array<ts.Diagnostic> {
  const diagnostics: Array<ts.Diagnostic> = [];

  for (const statement of sourceFile.statements) {
    const isAllowed: boolean =
      ts.isTypeAliasDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      isAmbientStatement(statement) ||
      (ts.isVariableStatement(statement) && hasInlineTag(statement)) ||
      (ts.isEnumDeclaration(statement) && statement.members.every((member) => isComputableEnumMember(checker, member))) ||
      (ts.isImportDeclaration(statement) &&
        (isTypeOnlyImport(checker, statement) || isAmbientModuleImport(checker, statement))) ||
      (ts.isExportDeclaration(statement) && (statement.isTypeOnly || statement.moduleSpecifier === undefined));

    if (!isAllowed) {
      diagnostics.push(createImpureVirtualModuleError(statement));
    }
  }

  return diagnostics;
}

/**
 * Scan the program for references to `@virtual` declarations that cannot be erased, and for impure modules
 * containing `@virtual` declarations.
 *
 * @param program - Program to scan.
 * @returns List of produced diagnostics.
 */
export function collectVirtualDiagnostics(program: ts.Program): Array<ts.Diagnostic> {
  const checker: ts.TypeChecker = program.getTypeChecker();
  const diagnostics: Array<ts.Diagnostic> = [];
  const virtualNames: Set<string> = new Set();
  const virtualModules: Set<ts.SourceFile> = new Set();

  // First pass: collect virtual declaration names for cheap identifier prefiltering.
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      continue;
    }

    for (const statement of sourceFile.statements) {
      if (!hasVirtualTag(statement)) {
        continue;
      }

      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) {
            virtualNames.add(declaration.name.text);
          }
        }

        virtualModules.add(sourceFile);
      } else if (ts.isEnumDeclaration(statement)) {
        virtualNames.add(statement.name.text);
        virtualModules.add(sourceFile);
      }
    }
  }

  if (virtualNames.size === 0) {
    return diagnostics;
  }

  for (const virtualModule of virtualModules) {
    diagnostics.push(...validateVirtualModulePurity(checker, virtualModule));
  }

  // Second pass: every reference to a virtual declaration must be erasable.
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      continue;
    }

    visitReferences(sourceFile);
  }

  return diagnostics;

  function visitReferences(node: ts.Node): void {
    if (ts.isIdentifier(node) && virtualNames.has(node.text)) {
      const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

      if (symbol !== undefined && getVirtualDeclaration(checker, symbol) !== null) {
        if (ts.isExportSpecifier(node.parent)) {
          diagnostics.push(createVirtualValueReferenceError(node, node.text));
        } else if (!isErasableReference(checker, node, symbol, true)) {
          diagnostics.push(createVirtualValueReferenceError(node, node.text));
        }
      }
    }

    node.forEachChild(visitReferences);
  }
}

/**
 * Get entries of a virtual object declaration for spread expansion.
 *
 * @param checker - Program type checker.
 * @param symbol - Virtual object symbol.
 * @returns List of property name/value pairs, or null when an entry is not computable.
 */
export function getVirtualObjectEntries(
  checker: ts.TypeChecker,
  symbol: ts.Symbol
): Array<[string, TFoldedValue]> | null {
  const declaration: ts.Declaration | undefined = resolveAliasedSymbol(checker, symbol).valueDeclaration;

  if (declaration === undefined || !ts.isVariableDeclaration(declaration)) {
    return null;
  }

  const entries: Array<[string, TFoldedValue]> = [];
  const type: ts.Type = checker.getTypeAtLocation(declaration);

  for (const property of type.getProperties()) {
    const value: TFoldedValue | null = tryGetInlineValue(checker, property);

    if (value === null) {
      return null;
    }

    entries.push([property.name, value]);
  }

  return entries;
}
