"use strict";

module.exports = {
  entryPoints: ["./src/main/ts/**/*.mts"],
  excludeInternal: true,
  excludePrivate: true,
  gitRemote: "upstream",
  includeVersion: true,
  name: "Cliofo",
  out: "./build/tsdoc",
  readme: "./README.md",
  tsconfig: "./tsconfig.json"
};
