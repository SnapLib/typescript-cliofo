import { type PrefixIndexParser, prefixIndexParser as indexParser } from "./prefix-index-parser.js";
import { type OperandArgString, operandArgString } from "./argument/operand-arg-string.js";
import { type FlagArgString, flagArgString } from "./argument/flag-arg-string.js";
import { type OptionArgString, optionArgString } from "./argument/option-arg-string.js";
import { stringPrefixArgString } from "./argument/string-prefix-arg-string.js";
import { stringSetPrefixArgString } from "./argument/string-set-prefix-arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string): string =>
{
    const quote = aString.length !== 1 ? "\"" : "'";
    return `${quote}${aString}${quote}`;
};

const mapToString = (aMap: ReadonlyMap<OperandArgString | FlagArgString | OptionArgString, readonly number[]>): string =>
{
    return "{" + String(Array.from(aMap.entries()).map(entry => `${stringToString(entry[0].argString.value)} => [${entry[1].join(", ")}]`).join(", ")) + "}";
};

export class PrefixArgumentIndexParser
{
    readonly #prefixIndexParser: Readonly<PrefixIndexParser>;
    readonly #operands: ReadonlyMap<OperandArgString, readonly number[]>;
    readonly #flags: ReadonlyMap<FlagArgString, readonly number[]>;
    readonly #options: ReadonlyMap<OptionArgString, readonly number[]>;
    readonly #string;

    public constructor(prefixIndexParser: PrefixIndexParser)
    {
        this.#prefixIndexParser = Object.isFrozen(prefixIndexParser) ? prefixIndexParser : Object.freeze(indexParser(prefixIndexParser));

        this.#operands = Object.freeze(new Map(Array.from(this.#prefixIndexParser.operands.entries()).
            map(operandIndexEntry =>
                [ operandArgString(stringSetPrefixArgString(
                    new Set([this.#prefixIndexParser.prefix.flagChar, this.#prefixIndexParser.prefix.optionString]),
                    operandIndexEntry[0])), operandIndexEntry[1]
                ]
            )));

        this.#flags = Object.freeze(new Map(Array.from(this.#prefixIndexParser.flags.entries()).
            map(flagIndexEntry =>
                [ flagArgString(stringPrefixArgString(
                    this.#prefixIndexParser.prefix.flagChar, flagIndexEntry[0])),
                    flagIndexEntry[1]
                ]
            )));

        this.#options = Object.freeze(new Map(Array.from(this.#prefixIndexParser.options.entries()).
            map(optionIndexEntry =>
                [ optionArgString(stringPrefixArgString(
                    this.#prefixIndexParser.prefix.optionString, optionIndexEntry[0])),
                    optionIndexEntry[1]
                ]
            )));

            this.#string = `${PrefixArgumentIndexParser.name} {prefix: ${this.#prefixIndexParser.prefix}, operands: ${mapToString(this.#operands)}, flags: ${mapToString(this.#flags)}, options: ${mapToString(this.#options)}}`;
    }

    public get operands(): ReadonlyMap<OperandArgString, readonly number[]> { return this.#operands; }
    public get flags(): ReadonlyMap<FlagArgString, readonly number[]> { return this.#flags; }
    public get options(): ReadonlyMap<OptionArgString, readonly number[]> { return this.#options; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}
