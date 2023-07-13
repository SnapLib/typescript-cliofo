import { type ConstrainedArgumentString } from "./argument/constrained-argument-string.js";
import { FlagString, flagString } from "./argument/flag-string.js";
import { operandString } from "./argument/operand-string.js";
import { optionString } from "./argument/option-string.js";

export class PrefixParser
{
    readonly #prefixChar: string;
    readonly #prefixString: string;
    readonly #strings: readonly string[];
    readonly #indexes: ReadonlyMap<ConstrainedArgumentString, readonly number[]>;

    public constructor(prefixCharOrCodePoint: NonNullable<string | number>, strings: NonNullable<readonly string[]>)
    {
        if (typeof prefixCharOrCodePoint === "string")
        {
            if (prefixCharOrCodePoint.length !== 1)
            {
                throw new Error(`prefix char doesn't consist of a single character: "${prefixCharOrCodePoint}"`);
            }

            this.#prefixChar = prefixCharOrCodePoint;
        }
        else
        {
            if ( ! Number.isInteger(prefixCharOrCodePoint))
            {
                throw new Error(`non integer prefix code point: ${prefixCharOrCodePoint}`);
            }

            this.#prefixChar = String.fromCodePoint(prefixCharOrCodePoint);
        }

        this.#prefixString = this.#prefixChar.repeat(2);
        this.#strings = Object.isFrozen(strings) ? strings : Object.freeze(Array.from(strings));

        this.#indexes = strings.reduce(
            (argIndexMap: Map<ConstrainedArgumentString, readonly number[]>, stringArg: string, index: number) =>
            {
                if (stringArg.startsWith(this.#prefixString))
                {
                    const optionArg = optionString(this.#prefixString, stringArg.substring(this.#prefixString.length));
                    return Object.freeze(argIndexMap.set(optionArg, Object.freeze(argIndexMap.get(optionArg)?.concat(index) ?? [index])));
                }
                else if (stringArg.startsWith(this.#prefixChar))
                {
                    const flagStrings: readonly FlagString[] = Object.freeze(Array.from(stringArg.substring(this.#prefixChar.length)).map(flagChar => flagString(this.#prefixChar, flagChar)));

                    for (const aFlagString of flagStrings)
                    {
                        argIndexMap.set(aFlagString, Object.freeze(argIndexMap.get(aFlagString)?.concat(index) ?? [index]));
                    }

                    return Object.freeze(argIndexMap);
                }
                else
                {

                    const operandArg = operandString(this.#prefixChar, stringArg);
                    return Object.freeze(argIndexMap.set(operandArg, Object.freeze(argIndexMap.get(operandArg)?.concat(index) ?? [index])));
                }
            },
            Object.freeze(new Map())
        );
    }

    public get prefixChar(): string { return this.#prefixChar; }
    public get prefixString(): string { return this.#prefixString; }
    public get strings(): readonly string[] { return this.#strings; }
    public get indexes(): ReadonlyMap<ConstrainedArgumentString, readonly number[]> { return this.#indexes; }
}
