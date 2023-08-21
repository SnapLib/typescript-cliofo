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

    public constructor(flagChar: NonNullable<string>)
    {
        if (flagChar === undefined || flagChar === null)
        {
            throw new PrefixFlagCharError(`${new.target.name}: ${flagChar} flag char.`);
        }

        if (flagChar.length !== 1)
        {
            throw new PrefixFlagCharError(`Flag character doesn't consist of single character: "${flagChar}"`);
        }

        this.#flagChar = flagChar;
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

/**
 * Error thrown by the {@link Prefix.constructor Prefix constructor} if `undefined`,
 * `null`, or `string` not consisting of single character is passed as an argument.
 */
export class PrefixFlagCharError extends Error
{
    public override readonly name: string = PrefixFlagCharError.name;

    /**
     * Constructs a new {@link PrefixFlagCharError} with the optional
     * `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
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
