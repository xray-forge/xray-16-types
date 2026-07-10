import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/stalker-xrf-xray16-sdk/",
  title: "XRF X-Ray 16 SDK",
  description: "TypeScript declarations, test helpers, and TypeScriptToLua plugins for Lua-visible X-Ray 16 APIs.",
  outDir: "../target/docs",
  markdown: {
    theme: { light: "github-light", dark: "night-owl" },
  },
  async transformPageData(pageData) {
    if (pageData.relativePath.startsWith("api/")) {
      pageData.frontmatter.pageClass = "api-reference";
    }

    if (/^api\/(types|alias|macros|lib|testing|mocks)\//.test(pageData.relativePath)) {
      pageData.frontmatter.prev = false;
      pageData.frontmatter.next = false;
    }
  },
  themeConfig: {
    outline: [2, 3],
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started", activeMatch: "/guide/" },
      { text: "Plugins", link: "/plugins/", activeMatch: "/plugins/" },
      { text: "API", link: "/api/", activeMatch: "/api/" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Engine Types and Aliases", link: "/guide/engine-types" },
          { text: "Macros and Shared Lib", link: "/guide/macros-and-lib" },
          { text: "Testing", link: "/guide/testing" },
          { text: "Ambient Typedefs", link: "/guide/typedefs" },
        ],
      },
      {
        text: "Plugins",
        items: [
          { text: "Overview", link: "/plugins/" },
          { text: "luabind", link: "/plugins/luabind" },
          { text: "strip", link: "/plugins/strip" },
          { text: "macros", link: "/plugins/macros" },
          { text: "optimize", link: "/plugins/optimize" },
          { text: "inline", link: "/plugins/inline" },
          { text: "libcompile", link: "/plugins/libcompile" },
          { text: "tracy", link: "/plugins/tracy" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Overview", link: "/api/" },
          {
            text: "Packages",
            items: [
              { text: "xray16", link: "/api/types/" },
              { text: "xray16/alias", link: "/api/alias/" },
              { text: "xray16/macros", link: "/api/macros/" },
              { text: "xray16/lib", link: "/api/lib/" },
              { text: "xray16/testing", link: "/api/testing/" },
              { text: "xray16/mocks", link: "/api/mocks/" },
            ],
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/xray-forge/stalker-xrf-xray16-sdk" },
      { icon: "npm", link: "https://www.npmjs.com/package/xray16" },
    ],
  },
});
