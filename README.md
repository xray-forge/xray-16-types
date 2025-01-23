# [📡 XRay-16 engine typescript definitions](https://github.com/xray-forge/xray-16-types)

[![types](https://img.shields.io/badge/docs-types-blue.svg?style=flat)](https://xray-forge.github.io/xray-16-types/index.html)
[![book](https://img.shields.io/badge/docs-book-blue.svg?style=flat)](https://xray-forge.github.io/stalker-xrf-book)
<br/>
[![Node.js CI](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml)

X-Ray16 engine bindings documentation and types. <br/>
For usage with [TypeScriptToLua](https://typescripttolua.github.io/docs/getting-started).

<p>
Module contains xray engine globals typedefs for typescript. <br/>
By default x-ray export bindings that can be accessed from lua scripts, but without any API documentation.

To check more details / correct typing you always can reference X-Ray source code.

</p>

## 🗻 Docs

Types documentation can be checked [here](https://xray-forge.github.io/xray-16-types/modules.html).

## 🧱 Usage

Types are used with [xrf template](https://github.com/xray-forge/stalker-xrf-engine) and can be referenced as an example.

## 📦Extending C++ classes and overriding virtual methods

### Lua

<p>
C++ classes can be extended in Lua code with 'class' keyword. 
Class declaration registers table as userdata and adds constructor/destructor metamethods. <br/>
</p>

### Typescript

<p>
In TS codebase 'LuabindClass' decorator can be used to modify transformation and enable virtual calls. <br/>
Separate transformer is needed to build luabind classes instead of table-based classes.
</p>

## 🧱 Getting up-to-date LUA bindings

- Run game engine with `-dump_bindings` flag
- Check userdata folder _(where game saves are stored)_ `scriptbindings_*.txt` files

## 🧲  Plugins

Package includes plugins for typescript-to-lua for easier work with xray16 typings. <br/>
Following ones are available:

- transform_luabind_class - transforms LuaBind decorated classes in a specific way
- built_at_info - adds build information in resulting files
- from_cast_utils - additional utils that should be removed in runtime
- global_declarations_transform - transforms xray16 imports and removes them from runtime
- inject_filename - adds $filename global variable to access current file name
- strip_lua_logger - removes lua logger from runtime (if path param is provided or ENV variable is set)
- inject_tracy_zones - removes lua logger from runtime (if path param is provided or ENV variable is set)

Arguments for JSTL:

- `--no-lua-logs`
- `--inject-tracy-zones`

Env variables for custom CLI scripts:

- `XR_NO_LUA_LOGS`
- `XR_INJECT_TRACY_ZONES `

Plugins can be included in tsconfig file as following:

```json
{
  "tstl": {
    "luaPlugins": [
      { "name": "xray16/plugins/transform_luabind_class/plugin" },
      { "name": "xray16/plugins/global_declarations_transform" },
      { "name": "xray16/plugins/built_at_info" },
      { "name": "xray16/plugins/strip_lua_logger" },
      { "name": "xray16/plugins/inject_filename" },
      { "name": "xray16/plugins/from_cast_utils" },
      { "name": "xray16/plugins/inject_tracy_zones" }
    ]
  }
}
```

### transform_luabind_class

Custom plugin overriding transformation of classes marked with `@LuaClass` decorator.\
Instead of using prototypes and metatables use luabind API to declare such classes.\

### built_at_info

Plugin injecting time and generic metadata on top of built lua scripts.

### global_declarations_transform

Plugin stripping all the runtime imports from `xray16` package.
Default `tstl` behaviour does not work well with engine imports and I tried to avoid implicit globals.

### strip_lua_logger

Plugin to strip all `LuaLogger` calls from runtime if env variable is set or path param is provided.\
Logger can consume a lot of processing time that does not benefit player.

### inject_filename

Plugin adding `$filename` global variable replaced with actual file name on build time.\
Lua does not provide convenient API do get filename in runtime and static step is much simpler.

### from_cast_utils

Plugin to simplify casting from `LuaTable` to typescript array/map objects.\
All the calls are completely gets stripped and removed from runtime.

### from_cast_utils

Plugin designed to work specifically with [tracy profiler](https://github.com/wolfpld/tracy).\
Once it is enabled with env variable or path parameter, tracy zone marking calls are injected for every method.\
This way you will be able to build profiling bundle to understand bottlenecks and what takes CPU time.
