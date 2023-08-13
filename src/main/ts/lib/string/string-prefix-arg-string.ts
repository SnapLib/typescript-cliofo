/**
 * This module contains the {@link StringPrefixArgString} class (and its factory
 * methods) used to create objects to represent a string argument that can be
 * passed on the command line consisting of a `string` prefix prepended to a
 * `string` value. The Cliofo API uses this class to represent ***flag*** and
 * ***option*** arguments. For example, consider the following 2 arguments:
 *
 * ```text
 * -h --help
 * ```
 *
 * The `-h` argument could be thought of as a flag consisting of the `'-'`
 * prefix `string` prepended to the `'h'` `string` value.
 *
 * The `--help` argument could be thought of as an option consisting of the
 * `"--"` prefix `string` prepended to the `"help"` `string` value.
 *
 * @module
 */

import { ArgString } from "./arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

/**
 * This class is used to create objects that consists of a `string` {@link ArgString.prefix}
 * prepended to a `string` {@link ArgString.value} to create its {@link ArgString.prefixedValue}.
 *
 * @see {@link ArgString}
 */
export class StringPrefixArgString extends ArgString<string>
{
    readonly #prefixedValue: string;
    readonly #string: string;

    /**
     * Constructs an object with the provided `string` prefix and value.
     *
     * @param prefix The `string` prepended to the beginning of the constructed
     *               object's {@link StringPrefixArgString.value} to create its
     *               {@link StringPrefixArgString.prefixedValue}.
     *
     * @param value  The `string` appended to the end of the constructed
     *               object's {@link StringPrefixArgString.prefix} to create its
     *               {@link StringPrefixArgString.prefixedValue}.
     */
    public constructor(prefix: NonNullable<string>, value: NonNullable<string>)
    {
        super(prefix, value);
        this.#prefixedValue = super.prefix + super.value;
        this.#string = `${StringPrefixArgString.name} {prefix: ${stringToString(super.prefix)}, value: ${stringToString(super.value)}}`;
    }

    /**
     * This object's prefixed `string` value property consisting of this
     * object's {@link StringPrefixArgString.prefix} `string` property prepended
     * to its {@link StringPrefixArgString.value} `string` property.
     *
     * @returns this object's prefixed value `string` property.
     */
    public override get prefixedValue(): string { return this.#prefixedValue; }

    /**
     * Returns `true` if the passed argument is a {@link StringPrefixArgString} object
     * with {@link StringPrefixArgString.prefix} and {@link StringPrefixArgString.value}
     * `string` properties equal to this object's prefix and value `string` properties.
     *
     * @param obj The argument being compared for equality to this
     *            {@link StringPrefixArgString} object.
     *
     * @returns `true` if the passed argument is equal to this
     *          {@link StringPrefixArgString} object.
     */
    public override equals(obj?: unknown): boolean
    {
        return    this === obj || obj instanceof StringPrefixArgString
               && super.prefix === obj.prefix && super.value === obj.value;
    }

    public override toString(): string { return this.#string; }

    public override [inspect.custom](): string { return this.#string; }
}

/**
 * Factory method for creating a {@link StringPrefixArgString} object with a
 * specified `string` {@link StringPrefixArgString.prefix} and
 * {@link StringPrefixArgString.value}.
 *
 * @param prefix The prefix `string` prepended to the beginning of the
 *               returned object's {@link StringPrefixArgString.value} to create
 *               its {@link StringPrefixArgString.prefixedValue} property.
 *
 * @param value  The `string` appended to the end of the returned
 *               {@link StringPrefixArgString}'s {@link StringPrefixArgString.prefix}
 *               to create its {@link StringPrefixArgString.prefixedValue} property.
 *
 * @returns A {@link StringPrefixArgString} object with its {@link StringPrefixArgString.prefix}
 *          and {@link StringPrefixArgString.value} properties set to the passed
 *          `string` arguments.
 */
export function stringPrefixArgString(prefix: NonNullable<string>, value: NonNullable<string>): StringPrefixArgString;

/**
 * Factory method for creating a {@link StringPrefixArgString} object by
 * copying the `string` {@link StringPrefixArgString.prefix} and
 * {@link StringPrefixArgString.value} properties from another
 * {@link StringPrefixArgString} object.
 *
 * @param other The object to copy properties from to the returned
 *              {@link StringPrefixArgString} object.
 *
 * @returns A {@link StringPrefixArgString} object with its {@link StringPrefixArgString.prefix}
 *          and {@link StringPrefixArgString.value} properties copied from the
 *          passed {@link StringPrefixArgString} object argument.
 */
export function stringPrefixArgString(other: NonNullable<StringPrefixArgString>): StringPrefixArgString;
export function stringPrefixArgString(prefixOrOther: NonNullable<string | StringPrefixArgString>, value?: string): StringPrefixArgString
{
    if (prefixOrOther instanceof StringPrefixArgString)
    {
        return new StringPrefixArgString(prefixOrOther.prefix, prefixOrOther.value);
    }

    if (value === undefined || value === null)
    {
        throw new TypeError(`${stringPrefixArgString.name}: ${value} value.`);
    }

    return new StringPrefixArgString(prefixOrOther, value);
}

export {stringPrefixArgString as default};
