import { ArgumentString, argumentString } from "./argument/argument-string.js";
import { type ConstrainedArgumentString } from "./argument/constrained-argument-string.js";
import { flagString } from "./argument/flag-string.js";
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
                    const optionArgString = argumentString(this.#prefixString, stringArg.substring(this.#prefixString.length));
                    const optionStr = Array.from(argIndexMap.keys()).find(optStr => optionArgString.equals(optStr.argString)) ?? optionString(optionArgString);
                    return Object.freeze(argIndexMap.set(optionStr, Object.freeze(argIndexMap.get(optionStr)?.concat(index) ?? [index])));
                }
                else if (stringArg.startsWith(this.#prefixChar))
                {
                    const flagArgStrings: readonly ArgumentString[] = Object.freeze(Array.from(stringArg.substring(this.#prefixChar.length)).map(flagChar => argumentString(this.#prefixChar, flagChar)));

                    for (const flagArgString of flagArgStrings)
                    {
                        const flagStr = Array.from(argIndexMap.keys()).find(flagStr => flagArgString.equals(flagStr.argString)) ?? flagString(flagArgString);
                        argIndexMap.set(flagStr, Object.freeze(argIndexMap.get(flagStr)?.concat(index) ?? [index]));
                    }

                    return Object.freeze(argIndexMap);
                }
                else
                {

                    const operandArgString = argumentString(this.#prefixChar, stringArg);
                    const operandStr = Array.from(argIndexMap.keys()).find(operStr => operandArgString.equals(operStr.argString)) ?? operandString(operandArgString);
                    return Object.freeze(argIndexMap.set(operandStr, Object.freeze(argIndexMap.get(operandStr)?.concat(index) ?? [index])));
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
