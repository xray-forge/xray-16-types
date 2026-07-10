---
layout: home

hero:
  name: "XRF X-Ray 16 SDK"
  text: ""
  tagline: ""
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Plugins
      link: /plugins/
    - theme: alt
      text: API Reference
      link: /api/types/

features:
  - title: Engine types
    details: Declarations for engine globals, luabind classes, UI and GOAP classes, and script objects, plus TypeScript-friendly aliases.
    link: /guide/engine-types
  - title: TypeScriptToLua plugins
    details: Opt-in build transforms — luabind class emission, macro folding, constant inlining, log stripping, lib bundling, Tracy zones.
    link: /plugins/
  - title: Testing toolkit
    details: A ts-jest config factory, Lua-like globals, an xray16 runtime stand-in, and Lua-aware jest matchers.
    link: /guide/testing
  - title: Shared lib and macros
    details: Compile-time helpers and shared constants that fold away in game builds but still run under Node and jest.
    link: /guide/macros-and-lib
---
