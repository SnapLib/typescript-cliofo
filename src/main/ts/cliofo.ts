import {CliofoPrefixOccurrenceCount} from "./lib/cliofoPrefixOccurrenceCount.js";
import {PrefixParser, copyPrefixParser} from "./lib/prefixParser.js";

export class Cliofo
{
    readonly #prefixParser: Readonly<PrefixParser>;
    readonly #occurrenceCount: Readonly<CliofoPrefixOccurrenceCount>;

    private constructor(prefixParser: Readonly<PrefixParser>)
    {
        this.#prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(copyPrefixParser(prefixParser));

        this.#occurrenceCount = Object.freeze(new CliofoPrefixOccurrenceCount(this.#prefixParser));
    }

    public prefixParser(): Readonly<PrefixParser> {return this.#prefixParser;}
    public occurrenceCount(): Readonly<CliofoPrefixOccurrenceCount> {return this.#occurrenceCount;}

    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        const jsonEntries: ReadonlyArray<readonly [string, string | readonly string[] | ReadonlyMap<string, number>]> =
            [
                ["prefixString", this.#prefixParser.prefixString()],
                ["strings", this.#prefixParser.strings()],
                ["operands", this.#prefixParser.operands()],
                ["flags", this.#prefixParser.flags()],
                ["options", this.#prefixParser.options()]
            ];
        return format.verbose
                   ? "" : "";
    }
}

export {Cliofo as default};
