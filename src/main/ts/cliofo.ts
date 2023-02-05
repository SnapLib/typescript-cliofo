import { CliArgPrefixParser } from "./lib/prefixParser.js";

const passedCliArgs = process.argv.slice(2);
const parsedPrefixCliArgs: CliArgPrefixParser = new CliArgPrefixParser("-", passedCliArgs);

const joinStrings = (strings: readonly string[]): string =>
{
    const quotes: string = strings.length !== 0 ? "\"" : "";
    return `[${quotes}${strings.join("\", \"")}${quotes}]`;
};

console.log(`args: ${joinStrings(passedCliArgs)}, parsed prefix cli: ${(parsedPrefixCliArgs)}`);
