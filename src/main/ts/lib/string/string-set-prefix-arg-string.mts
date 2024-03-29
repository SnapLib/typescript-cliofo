/**
 * This module contains the {@link StringSetPrefixArgString} class (and its factory methods) used to create objects to
 * represent string arguments that can be passed on the command line consisting of different `string` prefixes
 * prepended to a `string` value.
 *
 * The Cliofo API uses this class to represent ***operand*** arguments by defining prefixes that **can't** be prepended
 * to a value for it to be an operand. For example, consider the following 3 arguments:
 *
 * ```text
 * -v --color file.txt
 * ```
 *
 * The `file.txt` argument could be thought of as an operand argument with the specified `'-'` and `"--"` prefixes that
 * it *can't* contain as leading characters without being considered a flag or options like the `"-v"` and `"--color"`
 * arguments.
 *
 * @module string-set-prefix-arg-string
 *
 * @see {@link arg-string}
 * @see {@link operand-arg-string}
 */

import { ArgString, ArgStringValueError } from "./arg-string.mjs";
import { inspect } from "util";

const stringToString = (aString: string): string => aString.length != 1 ? `"${aString}"` : `'${aString}'`;
const stringArrayToString = (strings: ReadonlyArray<string>) => `[${strings.map(aString => stringToString(aString)).join(", ")}]`;

/**
 * This class is used to create objects that consists of multiple `string` {@link StringSetPrefixArgString.prefix}es
 * that can be prepended to a `string` {@link StringSetPrefixArgString.value} to create multiple
 * {@link ArgString.prefixedValue}s.
 *
 * @see {@link ArgString}
 * @see {@link operand-arg-string.operandArgString}
 */
export class StringSetPrefixArgString extends ArgString<ReadonlySet<string>>
{
    readonly #prefixesArray: readonly string[];
    readonly #prefixedValue: ReadonlySet<string>;
    readonly #prefixedValuesArray: readonly string[];
    readonly #string: string;

    /**
     * Constructs an object with the provided `string` prefixes and value. If either
     * of the arguments are `undefined` or `null`, an error will be thrown.
     *
     * @param prefixes
     * The `string`s that can be prepended to the beginning of the constructed object's
     * {@link StringSetPrefixArgString.value} to create its {@link StringSetPrefixArgString.prefixedValue}.
     *
     * @param value
     * The `string` appended to the end of the constructed object's {@link StringSetPrefixArgString.prefix}es to create
     * its {@link StringSetPrefixArgString.prefixedValue}s.
     *
     * @throws {@link arg-string.ArgStringPrefixError} if `undefined` or `null` is passed for the prefixes argument.
     *
     * @throws {@link arg-string.ArgStringValueError} if `undefined` or `null` is passed for the value argument.
     */
    public constructor(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>)
    {
        super(Object.isFrozen(prefixes) ? prefixes : Object.freeze(new Set(prefixes)), value);
        this.#prefixesArray = Object.freeze(Array.from(super.prefix));
        this.#prefixedValue = Object.freeze(new Set(this.#prefixesArray.map(prefixString => prefixString + value)));
        this.#prefixedValuesArray = Object.freeze(Array.from(this.#prefixedValue));
        this.#string = `${new.target.name} {prefixes: ${stringArrayToString(this.#prefixedValuesArray)}, value: ${stringToString(super.value)}}`;
    }

    /**
     * This object's leading `ReadonlySet<string>` property that is prepended to its
     * {@link StringSetPrefixArgString.value} to create its `Set` of {@link StringSetPrefixArgString.prefixedValue}
     * `string`s.
     */
    public override get prefix(): ReadonlySet<string> { return super.prefix; }

    /**
     * This object's suffix `string` property that's appended to its `string`s {@link StringSetPrefixArgString.prefix}
     * property to create its {@link StringSetPrefixArgString.prefixedValue} `string`s property.
     */
    public override get value(): string { return super.value; }

    /**
     * Returns a `Set` of `string`s created by prepending this object's {@link StringSetPrefixArgString.prefix}es to its
     * `string` {@link StringSetPrefixArgString.value}.
     */
    public override get prefixedValue(): ReadonlySet<string> { return this.#prefixedValue; }

    /**
     * Returns this object's {@link StringSetPrefixArgString.prefix}es as a
     * `readonly string[]` array (as opposed to a `ReadonlySet<string>`).
     *
     * @returns this object's {@link StringSetPrefixArgString.prefix}es as a
     *          `readonly string[]` array (as opposed to a `ReadonlySet<string>`).
     */
    public prefixes(): readonly string[] { return this.#prefixesArray; }

    /**
     * Returns this object's {@link StringSetPrefixArgString.prefixedValue}es as
     * a readonly string[]` array (as opposed to a `ReadonlySet<string>`).
     *
     * @returns this object's {@link StringSetPrefixArgString.prefixedValue}es as a
     *          `readonly string[]` array (as opposed to a `ReadonlySet<string>`).
     */
    public prefixedValues(): readonly string[] { return this.#prefixedValuesArray; }

    /**
     * Returns `true` if the passed argument is a {@link StringSetPrefixArgString} object
     * with {@link StringSetPrefixArgString.prefix} and {@link StringSetPrefixArgString.value}
     * `ReadonlySet<string>` properties equal to this object's prefix and value properties.
     *
     * @param obj The argument being compared for equality to this {@link StringSetPrefixArgString} object.
     *
     * @returns `true` if the passed argument is equal to this {@link StringSetPrefixArgString} object.
     */
    public override equals(obj: unknown | undefined | null): boolean
    {
        if (this === obj) { return true; }
        if ( ! (obj instanceof StringSetPrefixArgString)) { return false; }
        if (this.value !== obj.value) { return false; }
        if (this.prefix.size !== obj.prefix.size) { return false; }

        for (const prefixString of this.prefix)
        {
            if ( ! obj.prefix.has(prefixString))
            {
                return false;
            }
        }

        return true;
    }

    public override toString(): string { return this.#string; }

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the {@link StringSetPrefixArgString.toString} method.
     *
     * @returns a `string` representation of this object.
     */
    public override [inspect.custom](): string { return this.#string; }
}

/**
 * Creates a {@link StringSetPrefixArgString} object setting its {@link StringSetPrefixArgString.prefix}
 * to the provided `string` array converted to a frozen `Set<string>` and its
 * {@link StringSetPrefixArgString.value} to the provided `string`.
 *
 * @param prefixes An array of `string`s converted to a `Set<string>` to set as
 *                 the returned {@link StringSetPrefixArgString}'s
 *                 {@link StringSetPrefixArgString.prefix} property.
 *
 * @param value The `string` to set the returned {@link StringSetPrefixArgString}'s
 *              {@link StringSetPrefixArgString.value} to.
 *
 * @returns a {@link StringSetPrefixArgString} object with its {@link StringSetPrefixArgString.prefix}
 *          set to the provided `string` array converted to a frozen
 *          `Set<string>` and its {@link StringSetPrefixArgString.value} set to
 *          the provided `string.`
 */
export function stringSetPrefixArgString(prefixes: NonNullable<readonly string[]>, value: NonNullable<string>): StringSetPrefixArgString;

/**
 * Creates a {@link StringSetPrefixArgString} object setting its {@link StringSetPrefixArgString.prefix}
 * to the provided `Set<string>` and its {@link StringSetPrefixArgString.value}
 * to the provided `string`.
 *
 * @param prefixes The `Set` of `string`s to set the created {@link StringSetPrefixArgString}
 *                 object's {@link StringSetPrefixArgString.prefix} property to
 *                 prepend to the beginning of its {@link StringSetPrefixArgString.value}
 *                 to create its {@link StringSetPrefixArgString.prefixedValue}s property.
 *
 * @param value The `string` appended to the end of the returned
 *               {@link StringSetPrefixArgString}'s {@link StringSetPrefixArgString.prefix}es
 *               to create its {@link StringSetPrefixArgString.prefixedValue}s property.
 *
 * @returns a {@link StringSetPrefixArgString} object with its {@link StringSetPrefixArgString.prefix}
 *          set to the provided `Set<string>` and its
 *          {@link StringSetPrefixArgString.value} set to the provided `string.`
 *
 * @see {@link StringSetPrefixArgString}
 */
export function stringSetPrefixArgString(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>): StringSetPrefixArgString;

/**
 * Creates a new {@link StringSetPrefixArgString} object instance by copying
 * the {@link StringSetPrefixArgString.prefix} and {@link StringSetPrefixArgString.value}
 * properties from a pre-existing {@link StringSetPrefixArgString} object.
 *
 * @param other The other {@link StringSetPrefixArgString} object to copy the
 *              {@link StringSetPrefixArgString.prefix} and
 *              {@link StringSetPrefixArgString.value} properties from.
 *
 * @returns a new {@link StringSetPrefixArgString} object instance by copying
 *          another {@link StringSetPrefixArgString} object.
 *
 * @see {@link StringSetPrefixArgString}
 */
export function stringSetPrefixArgString(other: NonNullable<StringSetPrefixArgString>): StringSetPrefixArgString;
export function stringSetPrefixArgString(prefixesOrOther: readonly string[] | NonNullable<ReadonlySet<string> |  StringSetPrefixArgString>, value?: string): StringSetPrefixArgString
{
    if (prefixesOrOther instanceof StringSetPrefixArgString)
    {
        return new StringSetPrefixArgString(prefixesOrOther.prefix, prefixesOrOther.value);
    }

    if ( (prefixesOrOther === undefined || prefixesOrOther === null) && (value === undefined || value === null) )
    {
        throw new TypeError(`${stringSetPrefixArgString.name}: ${prefixesOrOther} prefix and ${value} value.`);
    }

    if (value === undefined || value === null)
    {
        throw new ArgStringValueError(`${stringSetPrefixArgString.name}: ${value} value.`);
    }

    return new StringSetPrefixArgString(
        prefixesOrOther instanceof Array ? Object.freeze(new Set(prefixesOrOther)) : prefixesOrOther,
        value
    );
}

export default stringSetPrefixArgString;
