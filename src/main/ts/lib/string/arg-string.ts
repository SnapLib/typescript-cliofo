/**
 * This module contains the {@link ArgString} class and
 * {@link StringOrReadonlyStringSet} type. The `ArgString` class is used to
 * represent strings that can be passed on the command line and the
 * {@link StringOrReadonlyStringSet} type is used to constrain the types of
 * prefixes and prefixed value(s)`ArgString`s can have to either a `string` or
 * `ReadOnlySet<string>`.
 *
 * The {@link ArgString} class is the parent class the
 * {@link string-prefix-arg-string.StringPrefixArgString} and
 * {@link string-set-prefix-arg-string.StringSetPrefixArgString} classes inherit
 * from.
 *
 * @module arg-string
 *
 * @see {@link string-prefix-arg-string}
 * @see {@link string-set-prefix-arg-string}
 */

import { ArgStringPrefixError, ArgStringValueError } from "./arg-string-error.js";
import { inspect } from "util";

/**
 * This type is used to constrain the type of prefix allowed for
 * {@link ArgString} objects to either a `string` or `ReadonlySet<string>`. It
 */
export type StringOrReadonlyStringSet = string | ReadonlySet<string>;

/**
 * This is the root class of the Cliofo argument string hierarchy used to
 * represent a string argument that can be passed on the command line. A command
 * line string argument consists of 2 fundamental parts:
 *
 * 1. A leading ***prefix*** `string` or `string`s
 * 1. and a suffix ***value*** `string` appended to the leading prefix(s)
 *
 * The leading prefix and prefixed value is constrained to
 * {@link StringOrReadonlyStringSet} (a`string` or set of multiple `string`s).
 *
 * This class is the parent class of the
 * {@link string-prefix-arg-string.StringPrefixArgString} and
 * {@link string-set-prefix-arg-string.StringSetPrefixArgString} classes.
 *
 * @typeParam PrefixType Type constrained to {@link StringOrReadonlyStringSet}
 *                       ()`string` or `ReadonlySet<string>`) specifying what
 *                       type of {@link ArgString.prefix} and
 *                       {@link ArgString.prefixedValue} this object has.
 */
export abstract class ArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefix: PrefixType;
    readonly #value: string;

    /**
     * Constructs an instance of an {@link ArgString} object with its
     * {@link ArgString.prefix} and {@link ArgString.value} properties set the
     * passed arguments. If `undefined` or `null` is passed for either argument,
     * an error will be thrown.
     *
     * @param prefix The `string` or `ReadonlySet<string>` to set as the
     *               constructed object's {@link ArgString.prefix}.
     *
     * @param value The `string` to set as this object's suffix {@link ArgString.value}.
     *
     * @throws {@link arg-string-error.ArgStringPrefixError} if `undefined` or `null` is passed for the prefix argument.
     *
     * @throws {@link arg-string-error.ArgStringValueError} if `undefined` or `null` is passed for the value argument.
     */
    protected constructor(prefix: NonNullable<PrefixType>, value: NonNullable<string>)
    {
        if (prefix === undefined || prefix === null)
        {
            throw new ArgStringPrefixError(`${this.constructor.name}: ${prefix} prefix.`);
        }

        if (value === undefined || value === null)
        {
            throw new ArgStringValueError(`${this.constructor.name}: ${value} value.`);
        }

        this.#prefix = prefix;
        this.#value = value;
    }

    /**
     * This object's leading `string` or `ReadonlySet<string>` prefix property
     * that is prepended to its {@link ArgString.value} to create its
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
