import { inspect } from "util";

/**
 * This type is used to constrain the type of prefixes allowed for {@link ArgString}
 * prefixes and the type of arguments an {@link ArgStringConstraint} and
 * {@link ConstrainedArgString} can consume. It consists of a `string` or
 * `ReadonlySet<string>` type.
 *
 * @see ArgString
 * @see ArgStringConstraint
 * @see ConstrainedArgString
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
 * a use case requires specifying more than 1 leading prefix `string`.
 */
export abstract class ArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefix: PrefixType;
    readonly #value: string;

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

    public get prefix(): PrefixType { return this.#prefix; }
    public get value(): string { return this.#value; }
    public abstract get prefixedValue(): PrefixType;

    public abstract equals(obj?: unknown): boolean;
    public abstract toString(): string;

    public abstract [inspect.custom](): string;
}

export {ArgString as default};
