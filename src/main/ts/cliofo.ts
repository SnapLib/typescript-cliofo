import { prefixArgumentIndexParser } from "./lib/prefix-argument-index-parser.js";

console.log(prefixArgumentIndexParser("-", process.argv.slice(2)));
