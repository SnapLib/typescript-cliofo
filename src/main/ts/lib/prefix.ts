/**
 * This module exports the {@link Prefix} class and its factory functions. The
 * {@link Prefix} class is used by the {@link prefix-index-parser.PrefixIndexParser}
 * class to contain the leading prefix `string`s a command line argument can or
 * cannot be prepended with to designate it an operand, flag, or option.
 *
 * @module prefix
 *
 * @see {@link prefix-index-parser}
 * @see {@link prefix-argument-index-parser}
 */

import { inspect } from "util";

/**
 * This class instantiates objects that is used by the {@link prefix-index-parser.PrefixIndexParser}
 * class to contain the leading prefix `string`s a command line argument can or
 * cannot be prepended with to designate it an operand, flag, or option.
 */
export class Prefix
{
    readonly #flagChar: string;
    readonly #optionString: string;
    readonly #string: string;

    public constructor(flagCharOrCodePointOrOther: NonNullable<string>)
    {
        if (flagCharOrCodePointOrOther === undefined || flagCharOrCodePointOrOther === null)
        {
            throw new TypeError(`${new.target.name}: ${flagCharOrCodePointOrOther} flag char.`);
        }

        if (flagCharOrCodePointOrOther.length !== 1)
        {
            throw new Error(`Flag character doesn't consist of single character: "${flagCharOrCodePointOrOther}"`);
        }

        this.#flagChar = flagCharOrCodePointOrOther;
        this.#optionString = this.#flagChar.repeat(2);
        this.#string = `${this.constructor.name} {flagChar: '${this.#flagChar}', optionString: "${this.#optionString}"}`;
    }

    public get flagChar(): string { return this.#flagChar; }
    public get optionString(): string { return this.#optionString; }

    public equals(obj: unknown): boolean
    {
        return this === obj || obj instanceof Prefix
               && this.#flagChar === obj.#flagChar
               && this.#optionString === obj.#optionString;
    }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export function prefix(flagChar: NonNullable<string>): Prefix;
export function prefix(other: NonNullable<Prefix>): Prefix;
export function prefix(flagCharOrCodePointOrOther: NonNullable<string | Prefix>): Prefix
{
    return new Prefix(typeof flagCharOrCodePointOrOther === "string"
                      ? flagCharOrCodePointOrOther
                      : flagCharOrCodePointOrOther.flagChar );
}

export default prefix;
