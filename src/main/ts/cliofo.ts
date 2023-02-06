import { CliArgPrefixParser } from "./lib/prefixParser.js";
import { joinStringsFormatted } from "./lib/util.js";

const passedCliArgs = process.argv.slice(2);
const parsedPrefixCliArgs: CliArgPrefixParser = new CliArgPrefixParser("-", passedCliArgs);

console.log(`args: ${joinStringsFormatted(passedCliArgs)}, parsed prefix cli: ${(parsedPrefixCliArgs)}`);
