import { ENV_XR_INJECT_TRACY_ZONES, ENV_XR_NO_LUA_LOGS } from "../constants";

export function isLuaLoggerEnabled(): boolean {
  return !process.argv.includes("--no-lua-logs") && process.env[ENV_XR_NO_LUA_LOGS] !== "true";
}

export function isTracyZonesInjectionEnabled(): boolean {
  return process.argv.includes("--inject-tracy-zones") || process.env[ENV_XR_INJECT_TRACY_ZONES] === "true";
}
