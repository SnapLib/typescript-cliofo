import CliofoPrefixOccurrenceCount from "./lib/cliofoPrefixOccurrenceCount.js";
import PrefixParser from "./lib/prefixParser.js";

export class Cliofo
{
    public readonly parsedPrefix: Readonly<PrefixParser>;
    public readonly occurrenceCount: Readonly<CliofoPrefixOccurrenceCount>;

    public constructor(prefixString: string, strings: readonly string[])
    {
        this.parsedPrefix = Object.freeze(new PrefixParser(prefixString, strings));

        this.occurrenceCount = Object.freeze(new CliofoPrefixOccurrenceCount(this.parsedPrefix));
    }

    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        return format.verbose
                   ? JSON.stringify({
                        prefixString: this.parsedPrefix.prefixString,
                        strings: this.parsedPrefix.strings,
                        operands: this.parsedPrefix.operands,
                        flags: this.parsedPrefix.flags,
                        options: this.parsedPrefix.options
                    },
                    format.replacer,
                    format.space)
                   : JSON.stringify(this);
    }
}

export {Cliofo as default};
