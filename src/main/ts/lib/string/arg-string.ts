/**
 * This module contains the {@link ArgString} class and
 * {@link StringOrReadonlyStringSet} type. The `ArgString` class is used to
 * represent strings that can be passed on the command line and the
 * {@link StringOrReadonlyStringSet} type is used to constrain the types of
 * prefixes `ArgString`s can have to either a `string` or `ReadOnlySet<string>`.
 *
 * @module
 */

import { inspect } from "util";

/**
 * This type is used to constrain the type of prefix allowed for
 * {@link ArgString} objects to either a `string` or `ReadonlySet<string>`.
 */
export type StringOrReadonlyStringSet = string | ReadonlySet<string>;

/**
 * This is the root class of the Cliofo argument string hierarchy used to represent
 * a string argument that can be passed on the command line. A command line string
 * argument consists of 2 fundamental parts:
 *
 * 1. A leading ***prefix*** `string` or `string`s
 * 1. and a suffix ***value*** `string` appended to the leading prefix(s)
 *
 * The leading prefix can be a single `string` or a set of multiple `string`s.
 *
 * @typeParam PrefixType - `string` or `ReadonlySet<string>` type specifying
 *                         what type of prefix this object has.
 */
export abstract class ArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefix: PrefixType;
    readonly #value: string;

    /**
     * Constructs an instance of an {@link ArgString} object. If `undefined` or
     * `null` is passed for either argument, an error will be thrown.
     *
     * @param prefix The value to set at this object's prefix or prefixes.
     *
     * @param value The `string` to set as this object's suffix value.
     *
     * @throws Error} if `undefined` or `null` is passed for either argument.
     */
    protected constructor(prefix: NonNullable<PrefixType>, value: NonNullable<string>)
    {
        if (prefix === undefined || prefix === null)
        {
            throw new Error(`${this.constructor.name}: ${prefix} prefix.`);
        }

        if (value === undefined || value === null)
        {
            throw new Error(`${this.constructor.name}: ${value} value.`);
        }

        this.#prefix = prefix;
        this.#value = value;
    }

    /**
     * This object's leading `string` or `ReadonlySet<string>` prefix
     * property that is prepended to its {@link ArgString.value} to create its
     * {@link ArgString.prefixedValue}.
     *
     * @returns this object's leading `string` or `ReadonlySet<string>` prefix property.
     */
    public get prefix(): PrefixType { return this.#prefix; }

    /**
     * This object's suffix `string` value property that's appended to its
     * {@link ArgString.prefix} property to create its {@link ArgString.prefixedValue}.
     *
     * @returns this object's suffix `string` value property.
     */
    public get value(): string { return this.#value; }

    /**
     * Getter for this object's `string` or `ReadonlySet<string>` prefixed
     * value(s) property.
     *
     * @returns this object's `string` or `ReadonlySet<string>` prefixed value property.
     */
    public abstract get prefixedValue(): PrefixType;

    /**
     * Returns `true` if the passed argument is equal to this {@link ArgString} object.
     *
     * @param obj The argument being compared for equality to this
     *            {@link ArgString} object.
     *
     * @returns `true` if the passed argument is equal to this {@link ArgString} object.
     */
    public abstract equals(obj?: unknown): boolean;

    /**
     * Returns a `string` representation of this object.
     *
     * @returns a `string` representation of this object.
     */
    public abstract toString(): string;

    /**
     * Returns a `string` representation of this object.
     *
     * @returns a `string` representation of this object.
     */
    public abstract [inspect.custom](): string;
}

export {ArgString as default};
