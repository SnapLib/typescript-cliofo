import { CliArgPrefixParser } from "./lib/cliArgPrefixParser.js";
import { joinStringsFormatted } from "./lib/util.js";

const passedCliArgs = process.argv.slice(2);
const parsedPrefixCliArgs: CliArgPrefixParser = new CliArgPrefixParser("-", passedCliArgs);

console.log("args: %s\n%s", joinStringsFormatted(passedCliArgs), parsedPrefixCliArgs.toString());
