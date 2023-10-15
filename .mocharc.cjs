"use strict";

module.exports = {
  "check-leaks": true,
  "node-option": [
    "loader=ts-node/esm"
  ],
  recursive: true,
  require: "ts-node/register",
  spec: "./src/test/ts/**/*.test.mts",
  ui: "tdd"
}
