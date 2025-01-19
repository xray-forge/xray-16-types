export const IS_LUA_LOGGER_DISABLED: boolean =
  process.argv.includes("--no-lua-logs") || process.env.XR_NO_LUA_LOGS === "true";
export const IS_TRACY_ZONES_INJECTION_ENABLED: boolean =
  process.argv.includes("--inject-tracy-zones") || process.env.XR_INJECT_TRACY_ZONES === "true";
