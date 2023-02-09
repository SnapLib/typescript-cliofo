import CliofoPrefixOccurrenceCount from "./lib/cliofoPrefixOccurrenceCount.js";
import PrefixParser from "./lib/prefixParser.js";

export class Cliofo
{
    readonly #parsedPrefix: Readonly<PrefixParser>;
    readonly #occurrenceCount: Readonly<CliofoPrefixOccurrenceCount>;

    public constructor(prefixString: string, strings: readonly string[])
    {
        this.#parsedPrefix = Object.freeze(new PrefixParser(prefixString, strings));

        this.#occurrenceCount = Object.freeze(new CliofoPrefixOccurrenceCount(this.#parsedPrefix));
    }

    public prefixParsed(): Readonly<PrefixParser> {return this.#parsedPrefix;}
    public occurrenceCount(): Readonly<CliofoPrefixOccurrenceCount> {return this.#occurrenceCount;}

    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        return format.verbose
                   ? JSON.stringify({
                        prefixString: this.#parsedPrefix.prefixString(),
                        strings: this.#parsedPrefix.strings(),
                        operands: this.#parsedPrefix.operands(),
                        flags: this.#parsedPrefix.flags(),
                        options: this.#parsedPrefix.options()
                    },
                    format.replacer,
                    format.space)
                   : this.#occurrenceCount.toJSON({replacer: format.replacer,
                                                   space: format.space});
    }
}

export {Cliofo as default};

console.log(new Cliofo("-", process.argv.slice(2)).toJSON({verbose: true, space: 2}));
