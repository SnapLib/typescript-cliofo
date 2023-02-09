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
        const jsonEntries: ReadonlyArray<readonly [string, string | readonly string[] | ReadonlyMap<string, number>]> =
            [
                ["prefixString", this.#parsedPrefix.prefixString()],
                ["strings", this.#parsedPrefix.strings()],
                ["operands", this.#parsedPrefix.operands()],
                ["flags", this.#parsedPrefix.flags()],
                ["options", this.#parsedPrefix.options()]
            ];

        return format.verbose
                   ? JSON.stringify(Object.fromEntries(jsonEntries), format.replacer, format.space)
                   : JSON.stringify(Object.fromEntries(jsonEntries.filter(jsonObjEntry => ! ["prefixString", "strings"].includes(jsonObjEntry[0]))), format.replacer, format.space);
    }
}

export {Cliofo as default};

console.log(new Cliofo("-", process.argv.slice(2)).toJSON({space: 2}));
