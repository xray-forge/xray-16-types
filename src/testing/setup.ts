import { setupLuaGlobals } from "./setup-lua-globals";
import { setupXrayRuntime } from "./setup-xray-runtime";

// Jest `setupFiles` entry wired by `createJestConfig`: injects Lua globals and bridges the `xray16`
// runtime module before each test file runs.
setupLuaGlobals();
setupXrayRuntime();
