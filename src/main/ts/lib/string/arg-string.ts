import { inspect } from "util";

/**
 * This type is used to constrain the type of prefixes allowed for {@link ArgString}
 * prefixes and the type of arguments an {@link ArgStringConstraint} and
 * {@link ConstrainedArgString} can consume. It consists of a `string` or
 * `ReadonlySet<string>` type.
 *
 * @see {@link ArgString}
 * @see {@link ArgStringConstraint}
 * @see {@link ConstrainedArgString}
 */
export type StringOrReadonlyStringSet = string | ReadonlySet<string>;

/**
 * This is the root class of the Cliofo argument string hierarchy used to represent
 * a string argument that can be passed on the command line. A command line string
 * argument consists of 2 fundamental parts:
 *
 * 1. A leading ***prefix*** `string` or `string`s
 * 1. and a suffix ***value*** `string` appended to the leading prefix
 *
 * The leading prefix can be a single `string` or a set of multiple `string`s if
 * a use case requires specifying more than 1 leading prefix `string`. This is
 * utilized by this API's {@link OperandArgString} class which specifies multiple
 * `string` values it's *not* allowed to have.
 *
 * @typeParam {StringOrReadonlyStringSet} PrefixType - `string` or
 * `ReadonlySet<string>` type specifying what type of prefix this object has.
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
     * @throws {Error} if `undefined` or `null` is passed for either argument.
     *
     * @protected
     * @constructor
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
     * Getter for this object's leading `string` or `ReadonlySet<string>` prefix
     * property.
     *
     * @returns this object's leading `string` or `ReadonlySet<string>` prefix property.
     *
     * @public
     * @method
     */
    public get prefix(): PrefixType { return this.#prefix; }

    /**
     * Getter for this object's suffix `string` value property.
     *
     * @returns this object's suffix `string` value property.
     *
     * @public
     * @method
     */
    public get value(): string { return this.#value; }

    /**
     * Getter for this object's `string` or `ReadonlySet<string>` prefixed value
     * property.
     *
     * @returns this object's `string` or `ReadonlySet<string>` prefixed value property.
     *
     * @public
     * @method
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
     *
     * @public
     * @method
     */
    public abstract toString(): string;

    /**
     * Returns a `string` representation of this object.
     *
     * @returns a `string` representation of this object.
     *
     * @public
     * @method
     */
    public abstract [inspect.custom](): string;
}

export {ArgString as default};
