"use strict";

module.exports = {
  "node-option": [
    "loader=ts-node/esm"
  ],
  recursive: true,
  require: "ts-node/register",
  spec: "./src/test/ts/**/*.test.mts",
  ui: "tdd"
}
