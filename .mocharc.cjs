module.exports = {
  extension: ["ts"],
  "node-option": [
    "loader=ts-node/esm"
  ],
  recursive: true,
  require: "ts-node/register",
  spec: "./src/test/ts/**/*.spec.ts",
  ui: "tdd"
}
