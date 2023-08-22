/**
 * This module contains the {@link ArgString} abstract class and {@link StringOrReadonlyStringSet} type. The `ArgString`
 * class is used to represent strings that can be passed on the command line and the {@link StringOrReadonlyStringSet}
 * type is used to constrain the types of prefixes and prefixed value(s)`ArgString`s can have to either a `string` or
 * `ReadOnlySet<string>`.
 *
 * The {@link ArgString} class is the parent class the {@link string-prefix-arg-string.StringPrefixArgString} and
 * {@link string-set-prefix-arg-string.StringSetPrefixArgString} classes inherit from.
 *
 * @module arg-string
 *
 * @see {@link string-prefix-arg-string}
 * @see {@link string-set-prefix-arg-string}
 */

import { inspect } from "util";

/**
 * This type is used to constrain the type of {@link ArgString.prefix} and {@link ArgString.prefixedValue} for
 * {@link ArgString} objects to either a `string` or `ReadonlySet<string>`.
 */
export type StringOrReadonlyStringSet = string | ReadonlySet<string>;

/**
 * This is the root class of the Cliofo argument string hierarchy used to represent a string argument that can be passed
 * on the command line. A command line string argument consists of 2 fundamental parts:
 *
 * 1. A leading ***prefix*** `string` or `Set` of `string`s
 * 1. and a suffix ***value*** `string` that can be appended to the leading prefix(es)
 *
 * The leading prefix and prefixed value is constrained to {@link StringOrReadonlyStringSet} (a`string` or `Set` of
 * multiple `string`s). If it has only a single `string` prefix, then it will in turn have only a single `string`
 * {@link ArgString.prefixedValue}. Conversely, if it has a `Set` of `string` prefixes, then it will in turn have a
 * `Set` of {@link ArgString.prefixedValue}s.
 *
 * This class is the parent class of the {@link string-prefix-arg-string.StringPrefixArgString} and
 * {@link string-set-prefix-arg-string.StringSetPrefixArgString} classes.
 *
 * @typeParam PrefixType
 * Type constrained to {@link StringOrReadonlyStringSet} (`string` or `ReadonlySet<string>`) specifying what type of
 * {@link ArgString.prefix} and {@link ArgString.prefixedValue} this object has.
 *
 * @see {@link string-prefix-arg-string.StringPrefixArgString}
 * @see {@link string-set-prefix-arg-string.StringSetPrefixArgString}
 */
export abstract class ArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefix: PrefixType;
    readonly #value: string;

    /**
     * Constructs an instance of an {@link ArgString} object with its {@link ArgString.prefix} and
     * {@link ArgString.value} properties set the passed arguments. If `undefined` or `null` is passed for either
     * argument, an error will be thrown.
     *
     * @param prefix The `string` or `ReadonlySet<string>` to set as the constructed object's {@link ArgString.prefix}.
     *
     * @param value The `string` to set as this object's suffix {@link ArgString.value}.
     *
     * @throws {@link ArgStringPrefixError} if `undefined` or `null` is passed for the prefix argument.
     *
     * @throws {@link ArgStringValueError} if `undefined` or `null` is passed for the value argument.
     */
    protected constructor(prefix: NonNullable<PrefixType>, value: NonNullable<string>)
    {
        if (prefix === undefined || prefix === null)
        {
            throw new ArgStringPrefixError(`${new.target.name}: ${prefix} prefix.`);
        }

        if (value === undefined || value === null)
        {
            throw new ArgStringValueError(`${new.target.name}: ${value} value.`);
        }

        this.#prefix = prefix;
        this.#value = value;
    }

    /**
     * This object's leading `string` or `ReadonlySet<string>` prefix property that is prepended to its
     * {@link ArgString.value} to create its {@link ArgString.prefixedValue}(s).
     */
    public get prefix(): PrefixType { return this.#prefix; }

    /**
     * This object's suffix `string` value property that's appended to its {@link ArgString.prefix} property to create
     * its {@link ArgString.prefixedValue}(s).
     */
    public get value(): string { return this.#value; }

    /**
     * This object's `string` or `ReadonlySet<string>` prefixed value(s) property.
     */
    public abstract get prefixedValue(): PrefixType;

    /**
     * Returns `true` if the passed argument is equal to this {@link ArgString} object.
     *
     * @param obj The argument being compared for equality to this {@link ArgString} object.
     *
     * @returns `true` if the passed argument is equal to this {@link ArgString} object.
     */
    public abstract equals(obj: unknown | undefined | null): boolean;

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the `[inspect.custom]()` method.
     *
     * @returns a `string` representation of this object.
     */
    public abstract toString(): string;

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the {@link ArgString.toString} method.
     *
     * @returns a `string` representation of this object.
     */
    public abstract [inspect.custom](): string;
}

/**
 * Error thrown by the {@link ArgString.constructor ArgString constructor} if
 * `undefined` or `null` is passed as an argument for the `prefix` argument.
 */
export class ArgStringPrefixError extends Error
{
    public override readonly name: string = ArgStringPrefixError.name;

    /**
     * Constructs a new {@link ArgStringPrefixError} with the optional `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * Error thrown by the {@link ArgString.constructor ArgString constructor} if
 * `undefined` or `null` is passed as an argument for the `value` argument.
 */
export class ArgStringValueError extends Error
{
    public override readonly name: string = ArgStringValueError.name;

    /**
     * Constructs a new {@link ArgStringValueError} with the optional `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default ArgString;
