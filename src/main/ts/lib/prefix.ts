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

const whiteSpaceRegex: RegExp = /^\s$/;

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

    /**
     * Constructs a new {@link Prefix} object instance using the provided character argument as the instantiated
     * object's flag character and to generate the object's option string. If the flag character is `undefined`, `null`,
     * or a `string` not consisting of a single non-whitespace character, an error is thrown.
     *
     * @param flagChar The `string` character used as the instantiated object's {@link Prefix.flagChar}
     *                 character and to generate its {@link Prefix.optionString}.
     *
     * @throws {@link PrefixFlagCharError} if the passed `string` argument is `undefined`, `null`, or doesn't consist of
     *                                     a single non-whitespace character.
     */
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

        if (whiteSpaceRegex.test(flagChar))
        {
            throw new PrefixFlagCharError("Flag character consists of whitespace.");
        }

        this.#flagChar = flagChar;
        this.#optionString = this.#flagChar.repeat(2);
        this.#string = `${this.constructor.name} {flagChar: '${this.#flagChar}', optionString: "${this.#optionString}"}`;
    }

    /** This object's flag character `string` property. */
    public get flagChar(): string { return this.#flagChar; }

    /** This object's option `string` created by repeating its {@link Prefix.flagChar} twice. */
    public get optionString(): string { return this.#optionString; }

    /**
     * Returns `true` if the passed argument is equal to this {@link Prefix} object.
     *
     * @param obj The argument being compared for equality to this
     *            {@link Prefix} object.
     *
     * @returns `true` if the passed argument is equal to this {@link Prefix} object.
     */
    public equals(obj: unknown | undefined | null): boolean
    {
        return this === obj || obj instanceof Prefix
               && this.#flagChar === obj.#flagChar
               && this.#optionString === obj.#optionString;
    }

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the `[inspect.custom]()` method.
     *
     * @returns a `string` representation of this object.
     */
    public toString(): string { return this.#string; }

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the {@link Prefix.toString} method.
     *
     * @returns a `string` representation of this object.
     */
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
export function prefix(flagCharOrOther: NonNullable<string | Prefix>): Prefix
{
    return new Prefix(typeof flagCharOrOther === "string"
                      ? flagCharOrOther
                      : flagCharOrOther.flagChar );
}

export default prefix;
