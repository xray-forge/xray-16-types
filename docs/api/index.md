# API Reference

Generated reference for every `xray16` package surface. Each package page lists its exports grouped by topic; entries link to per-member pages.

| Package                              | Description                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| [xray16](./types/index.md)           | Engine declarations — globals, luabind classes, UI and GOAP classes, and script objects. |
| [xray16/alias](./alias/index.md)     | Readable aliases for engine declaration names and virtual engine enums.                  |
| [xray16/macros](./macros/index.md)   | Compile-time helpers with a Node/Jest runtime fallback.                                  |
| [xray16/lib](./lib/index.md)         | Shared aliases, constants, and small runtime helpers.                                    |
| [xray16/testing](./testing/index.md) | Jest configuration factory, setup helpers, and matchers.                                 |
| [xray16/mocks](./mocks/index.md)     | Lua-like runtime helpers and engine class mocks for Node-based tests.                    |

Declarations describe the TypeScript-visible API shape; C++ engine bindings define runtime behavior. Check the engine source when declaration syntax is ambiguous.
