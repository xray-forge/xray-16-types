# Ambient Typedefs

Ambient typedefs describe X-Ray globals and bundled Lua libraries. They are not modules to import; add them to `compilerOptions.types` or reference them with `/// <reference types="..." />`.

| Typedef                      | Provides                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `xray16/typedefs/extensions` | OpenXRay `table` and `string` extensions, including `table.random`, `table.size`, and `string.trim` variants. |
| `xray16/typedefs/luajit`     | LuaJIT globals and methods missing from the default TSTL typings.                                             |
| `xray16/typedefs/lfs`        | LuaFileSystem (`lfs`).                                                                                        |
| `xray16/typedefs/marshal`    | `marshal` serialization helpers.                                                                              |
| `xray16/typedefs/jest`       | Types for the custom Jest matchers.                                                                           |

```jsonc
{
  "compilerOptions": {
    "types": [
      "@typescript-to-lua/language-extensions",
      "xray16",
      "xray16/typedefs/extensions",
      "xray16/typedefs/luajit",
    ],
  },
}
```
