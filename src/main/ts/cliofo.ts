import {CliofoPrefixOccurrenceCount} from "./lib/cliofoPrefixOccurrenceCount.js";
import {PrefixParser, copyPrefixParser} from "./lib/prefixParser.js";

export class Cliofo
{
    readonly #prefixParser: Readonly<PrefixParser>;
    readonly #occurrenceCount: Readonly<CliofoPrefixOccurrenceCount>;
    readonly #jsonEntries: ReadonlyArray<readonly [string, unknown]>;

    private constructor(prefixParser: Readonly<PrefixParser>)
    {
        this.#prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(copyPrefixParser(prefixParser));

        this.#occurrenceCount = Object.freeze(new CliofoPrefixOccurrenceCount(this.#prefixParser));

        this.#jsonEntries = Object.freeze([
            ["prefixString", this.#prefixParser.prefixString()],
            ["strings", this.#prefixParser.strings()],
            ["operands", this.#occurrenceCount.operandsOccurrenceCountMap()],
            ["flags", this.#occurrenceCount.flagsOccurrenceCountMap()],
            ["options", this.#occurrenceCount.optionsOccurrenceCountMap()]
        ]);
    }

    public prefixParser(): Readonly<PrefixParser> {return this.#prefixParser;}
    public occurrenceCount(): Readonly<CliofoPrefixOccurrenceCount> {return this.#occurrenceCount;}

    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        return "";
    }
}

export { PrefixParser } from "./lib/prefixParser.js";
export { OperandsFlagsOptions } from "./lib/operandsFlagsOptions.js";
