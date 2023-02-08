import { PrefixParser } from "./lib/prefixParser.js";

console.log(new PrefixParser("-", process.argv.slice(2)));

export { PrefixParser } from "./lib/prefixParser.js";
export { OperandsFlagsOptions } from "./lib/operandsFlagsOptions.js";
