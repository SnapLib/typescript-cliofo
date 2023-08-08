import { inspect } from "util";
import { type Prefix, prefix } from "./prefix.js";

export class PrefixIndexParser implements IterableIterator<readonly [string, readonly number[]]>
{
    readonly #prefix: Readonly<Prefix>;
    readonly #strings: readonly string[];
    readonly #operands: ReadonlyMap<string, readonly number[]>;
    readonly #flags: ReadonlyMap<string, readonly number[]>;
    readonly #options: ReadonlyMap<string, readonly number[]>;
    readonly #string: string;

    readonly #operandFlagOptionIndexEntries: readonly Readonly<[string, readonly number[]]>[];
    #iterIndex: number = 0;

    public constructor(argumentPrefix: NonNullable<string | number | Prefix>, strings: NonNullable<readonly string[]>)
    {
        if (argumentPrefix === undefined || argumentPrefix === null)
        {
            throw new Error(`${PrefixIndexParser.name}: ${argumentPrefix} prefix`);
        }

        if (strings === undefined || strings === null)
        {
            throw new Error(`${PrefixIndexParser.name}: ${strings} strings`);
        }

        if (typeof argumentPrefix === "string")
        {
            if (argumentPrefix.length !== 1)
            {
                throw new Error(`${PrefixIndexParser.name}: prefix doesn't consist of single character: "${argumentPrefix}"`);
            }

            this.#prefix = Object.freeze(prefix(argumentPrefix));
        }
        else if (typeof argumentPrefix === "number")
        {
            this.#prefix = Object.freeze(prefix(argumentPrefix));
        }
        else
        {
            this.#prefix = Object.isFrozen(argumentPrefix) ? argumentPrefix : Object.freeze(prefix(argumentPrefix));
        }

        this.#strings = Object.isFrozen(strings) ? strings : Object.freeze(Array.from(strings));

        const argValueIndexMaps = this.#strings.reduce(
            (argValueIndexes, argString, argIndex) =>
            {
                if (argString.startsWith(this.#prefix.optionString))
                {
                    const argValue: string = argString.substring(this.#prefix.optionString.length);

                    argValueIndexes[2].set(argValue, Object.freeze(argValueIndexes[2].get(argValue)?.concat(argIndex) ?? [argIndex]));
                }
                else if (argString.startsWith(this.#prefix.flagChar))
                {
                    for (const char of argString.substring(this.#prefix.flagChar.length))
                    {
                        argValueIndexes[1].set(char, Object.freeze(argValueIndexes[1].get(char)?.concat(argIndex) ?? [argIndex]));
                    }
                }
                else
                {
                    argValueIndexes[0].set(argString, Object.freeze(argValueIndexes[0].get(argString)?.concat(argIndex) ?? [argIndex]));
                }

                return argValueIndexes;
            },
            Object.freeze([new Map(), new Map(), new Map()]) as readonly [Map<string, readonly number[]>, Map<string, readonly number[]>, Map<string, readonly number[]>]
        );

        this.#operands = Object.freeze(argValueIndexMaps[0]);
        this.#flags = Object.freeze(argValueIndexMaps[1]);
        this.#options = Object.freeze(argValueIndexMaps[2]);
        this.#string = `${PrefixIndexParser.name} {prefix: ${this.#prefix}, operands: ${mapToString(this.#operands)}, flags: ${mapToString(this.#flags)}, options: ${mapToString(this.#options)}}`;

        this.#operandFlagOptionIndexEntries = Object.freeze([...this.#operands.entries(), ...this.#flags.entries(), ...this.#options.entries()]);
    }

    public get prefix(): Readonly<Prefix> { return this.#prefix; }
    public get strings(): readonly string[] { return this.#strings; }
    public get operands(): ReadonlyMap<string, readonly number[]> { return this.#operands; }
    public get flags(): ReadonlyMap<string, readonly number[]> { return this.#flags; }
    public get options(): ReadonlyMap<string, readonly number[]> { return this.#options; }

    public next(): IteratorResult<readonly [string, readonly number[]]>
    {
        if (this.#iterIndex < this.#operandFlagOptionIndexEntries.length)
        {
            return { done: false, value: this.#operandFlagOptionIndexEntries[this.#iterIndex++] };
        }
        else
        {
            this.#iterIndex = 0; // reset the pointer to start for new iterations
            return { done: true, value: null };
        }
    }

    public [Symbol.iterator](): IterableIterator<readonly [string, readonly number[]]>
    {
        return this;
    }

    public toString(): string { return this.#string; }
    public [inspect.custom]() { return this.#string; }
}

function stringToString(aString: string): string
{
    const quote = aString.length !== 1 ? "\"" : "'";
    return `${quote}${aString}${quote}`;
}

function mapToString(aMap: ReadonlyMap<string, readonly number[]>): string
{
    return "{" + String(Array.from(aMap.entries()).map(entry => `${stringToString(entry[0])} => [${entry[1].join(", ")}]`).join(", ")) + "}";
}

export function prefixIndexParser(prefixChar: NonNullable<string>, stringsToParse: NonNullable<readonly string[]>): PrefixIndexParser;
export function prefixIndexParser(prefixCodePoint: NonNullable<number>, stringsToParse: NonNullable<readonly string[]>): PrefixIndexParser;
export function prefixIndexParser(prefix: NonNullable<Prefix>, stringsToParse: NonNullable<readonly string[]>): PrefixIndexParser;
export function prefixIndexParser(other: NonNullable<PrefixIndexParser>): PrefixIndexParser;
export function prefixIndexParser(prefixCharOrCodePointOrOther: NonNullable<string | number | Prefix | PrefixIndexParser>, stringsToParse?: readonly string[]): PrefixIndexParser
{
    if (prefixCharOrCodePointOrOther instanceof PrefixIndexParser)
    {
        return new PrefixIndexParser(prefixCharOrCodePointOrOther.prefix.flagChar, prefixCharOrCodePointOrOther.strings);
    }
    else
    {
        if (stringsToParse === undefined || stringsToParse === null)
        {
            throw new Error(`${prefixIndexParser.name}: ${stringsToParse} strings to parse argument.`);
        }

        return new PrefixIndexParser(prefixCharOrCodePointOrOther, stringsToParse);
    }
}

export {prefixIndexParser as default};
