/**
 * @module prefix-argument-index-parser
 */

import { type PrefixIndexParser, prefixIndexParser as indexParser, prefixIndexParser } from "./prefix-index-parser.js";
import { type OperandArgString, operandArgString } from "./constrained-string/operand-arg-string.js";
import { type FlagArgString, flagArgString } from "./constrained-string/flag-arg-string.js";
import { type OptionArgString, optionArgString } from "./constrained-string/option-arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string): string => aString.length !== 1 ? `"${aString}"` : `'${aString}'`;

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

    public constructor(prefixIndexParser: NonNullable<PrefixIndexParser>)
    {
        if (prefixIndexParser === undefined || prefixIndexParser === null)
        {
            throw new TypeError(`${new.target.name}: ${prefixIndexParser} prefix index parser.`);
        }

        this.#prefixIndexParser = Object.isFrozen(prefixIndexParser) ? prefixIndexParser : Object.freeze(indexParser(prefixIndexParser));

        this.#operands = Object.freeze(new Map(Array.from(this.#prefixIndexParser.operands.entries()).
            map(operandIndexEntry => [
                operandArgString( new Set([this.#prefixIndexParser.prefix.flagChar, this.#prefixIndexParser.prefix.optionString]),
                                  operandIndexEntry[0]),
                operandIndexEntry[1]
            ] )));

        this.#flags = Object.freeze(new Map(Array.from(this.#prefixIndexParser.flags.entries()).
            map(flagIndexEntry => [
                flagArgString( this.#prefixIndexParser.prefix.flagChar,
                                flagIndexEntry[0] ),
                flagIndexEntry[1]
            ] )));

        this.#options = Object.freeze(new Map(Array.from(this.#prefixIndexParser.options.entries()).
            map(optionIndexEntry => [
                optionArgString( this.#prefixIndexParser.prefix.optionString,
                                 optionIndexEntry[0]),
                optionIndexEntry[1]
            ] )));

            this.#string = `${new.target.name} {prefix: {flagChar: '${this.#prefixIndexParser.prefix.flagChar}', optionString: "${this.#prefixIndexParser.prefix.optionString}"}, operands: ${mapToString(this.#operands)}, flags: ${mapToString(this.#flags)}, options: ${mapToString(this.#options)}}`;
    }

    public get prefixIndexParser(): Readonly<PrefixIndexParser> { return this.#prefixIndexParser; }
    public get operands(): ReadonlyMap<OperandArgString, readonly number[]> { return this.#operands; }
    public get flags(): ReadonlyMap<FlagArgString, readonly number[]> { return this.#flags; }
    public get options(): ReadonlyMap<OptionArgString, readonly number[]> { return this.#options; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export function prefixArgumentIndexParser(prefixChar: NonNullable<string>, stringsToParse: NonNullable<readonly string[]>): PrefixArgumentIndexParser;
export function prefixArgumentIndexParser(prefixIndexParser: NonNullable<PrefixIndexParser>): PrefixArgumentIndexParser;
export function prefixArgumentIndexParser(other: NonNullable<PrefixArgumentIndexParser>): PrefixArgumentIndexParser;
export function prefixArgumentIndexParser(prefixCharOrPrefixIndexParserOrOther: NonNullable<string | PrefixIndexParser | PrefixArgumentIndexParser>, stringsToParse?: readonly string[]): PrefixArgumentIndexParser
{
    if (typeof prefixCharOrPrefixIndexParserOrOther === "string")
    {
        if (stringsToParse === undefined || stringsToParse === null)
        {
            throw new Error(`${prefixArgumentIndexParser.name}: ${stringsToParse} strings to parse argument.`);
        }

        return new PrefixArgumentIndexParser(prefixIndexParser(prefixCharOrPrefixIndexParserOrOther, stringsToParse));
    }
    else if (prefixCharOrPrefixIndexParserOrOther instanceof PrefixArgumentIndexParser)
    {
        return new PrefixArgumentIndexParser(prefixIndexParser(prefixCharOrPrefixIndexParserOrOther.prefixIndexParser.prefix.flagChar, prefixCharOrPrefixIndexParserOrOther.prefixIndexParser.strings));
    }
    else
    {
        return new PrefixArgumentIndexParser(prefixCharOrPrefixIndexParserOrOther);
    }
}

export default PrefixArgumentIndexParser;
