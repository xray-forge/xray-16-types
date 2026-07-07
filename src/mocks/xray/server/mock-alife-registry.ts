import type { cse_alife_object } from "xray16";

export interface IMockAlifeRegistry {
  infoPortions: Record<number, Set<string>>;
  objects: Record<number, cse_alife_object>;
}

export const mockAlifeRegistry: IMockAlifeRegistry = {
  infoPortions: {},
  objects: {},
};

export function resetMockAlifeRegistry(): void {
  mockAlifeRegistry.infoPortions = {};
  mockAlifeRegistry.objects = {};
}

export function addMockAlifeObjectToRegistry(object: cse_alife_object): void {
  mockAlifeRegistry.objects[object.id] = object;
}

export function removeMockAlifeObjectFromRegistry(id: number): void {
  delete mockAlifeRegistry.objects[id];
  delete mockAlifeRegistry.infoPortions[id];
}
