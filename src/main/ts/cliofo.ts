import { PrefixParser } from "./lib/prefixParser.js";
import { joinStringsFormatted } from "./lib/util.js";

const passedCliArgs = process.argv.slice(2);
const parsedPrefixCliArgs: PrefixParser = new PrefixParser("-", passedCliArgs);

console.log("args: %s\n%s", joinStringsFormatted(passedCliArgs), parsedPrefixCliArgs.toString());
