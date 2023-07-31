import { inspect } from "util";
import { type Prefix, prefix } from "./prefix.js";

export class PrefixIndexParser
{
    readonly #prefix: Readonly<Prefix>;
    readonly #strings: readonly string[];
    readonly #operands: ReadonlyMap<string, readonly number[]>;
    readonly #flags: ReadonlyMap<string, readonly number[]>;
    readonly #options: ReadonlyMap<string, readonly number[]>;
    readonly #string: string;

    public constructor(argumentPrefix: NonNullable<string | number | Prefix>, strings: NonNullable<readonly string[]>)
    {
        if (argumentPrefix === undefined || argumentPrefix === null)
        {
            throw new Error("undefined or null prefix char");
        }

        if (strings === undefined || strings === null)
        {
            throw new Error("undefined or null strings");
        }

        if (typeof argumentPrefix === "string")
        {
            if (argumentPrefix.length !== 1)
            {
                throw new Error(`prefix char doesn't consist of single character: "${argumentPrefix}"`);
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

                    argValueIndexes.options.set(argValue, Object.freeze(argValueIndexes.options.get(argValue)?.concat(argIndex) ?? [argIndex]));
                }
                else if (argString.startsWith(this.#prefix.flagChar))
                {
                    for (const char of argString.substring(this.#prefix.flagChar.length))
                    {
                        argValueIndexes.flags.set(char, Object.freeze(argValueIndexes.flags.get(char)?.concat(argIndex) ?? [argIndex]));
                    }
                }
                else
                {
                    argValueIndexes.operands.set(argString, Object.freeze(argValueIndexes.operands.get(argString)?.concat(argIndex) ?? [argIndex]));
                }

                return argValueIndexes;
            },
            Object.freeze({operands: new Map(), flags: new Map(), options: new Map()}) as Readonly<{operands: Map<string, readonly number[]>, flags: Map<string, readonly number[]>, options: Map<string, readonly number[]>}>
        );

        this.#operands = Object.freeze(argValueIndexMaps.operands);
        this.#flags = Object.freeze(argValueIndexMaps.flags);
        this.#options = Object.freeze(argValueIndexMaps.options);
        this.#string = `${this.constructor.name} {prefix: ${this.#prefix}, operands: ${mapToString(this.#operands)}, flags: ${mapToString(this.#flags)}, options: ${mapToString(this.#options)}}`;
    }

    public get prefix(): Readonly<Prefix> { return this.#prefix; }
    public get strings(): readonly string[] { return this.#strings; }
    public get operands(): ReadonlyMap<string, readonly number[]> { return this.#operands; }
    public get flags(): ReadonlyMap<string, readonly number[]> { return this.#flags; }
    public get options(): ReadonlyMap<string, readonly number[]> { return this.#options; }

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

export {PrefixIndexParser as default};
