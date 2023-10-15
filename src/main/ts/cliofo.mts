import { prefixArgumentIndexParser } from "./lib/prefix-argument-index-parser.mjs";

console.log(prefixArgumentIndexParser("-", process.argv.slice(2)));
