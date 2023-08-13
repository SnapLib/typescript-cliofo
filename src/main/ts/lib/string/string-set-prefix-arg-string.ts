/**
 * This module contains the {@link StringSetPrefixArgString} class (and its
 * factory methods) used to create objects to represent string arguments that
 * can be passed on the command line consisting of different `string` prefixes
 * prepended to a `string` value.
 *
 * The Cliofo API uses this class to represent ***operand*** arguments by
 * defining prefixes that **can't** be prepended to a value for it to be an
 * operand. For example, consider the following 3 arguments:
 *
 * ```text
 * -v --color file.txt
 * ```
 *
 * The `file.txt` argument could be thought of as an operand argument with the
 * specified `'-'` and `"--"` prefixes that it can't contain without being
 * considered a flag or options like the `"-v"` and `"--color"` arguments.
 *
 * @module
 */

import { ArgString } from "./arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string): string => aString.length != 1 ? `"${aString}"` : `'${aString}'`;
const stringArrayToString = (strings: ReadonlyArray<string>) => `[${strings.map(aString => stringToString(aString)).join(", ")}]`;

/**
 * This class is used to create objects that consists of multiple
 */
export class StringSetPrefixArgString extends ArgString<ReadonlySet<string>>
{
    readonly #prefixesArray: ReadonlyArray<string>;
    readonly #prefixedValue: ReadonlySet<string>;
    readonly #prefixedValuesArray: ReadonlyArray<string>;
    readonly #string: string;

    public constructor(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>)
    {
        super(Object.isFrozen(prefixes) ? prefixes : Object.freeze(new Set(prefixes)), value);
        this.#prefixesArray = Object.freeze(Array.from(super.prefix));
        this.#prefixedValue = Object.freeze(new Set(this.#prefixesArray.map(prefixString => prefixString + value)));
        this.#prefixedValuesArray = Object.freeze(Array.from(this.#prefixedValue));
        this.#string = `${StringSetPrefixArgString.name} {prefixes: ${stringArrayToString(this.#prefixedValuesArray)}, value: ${stringToString(super.value)}}`;
    }

    public override get prefixedValue(): ReadonlySet<string> { return this.#prefixedValue; }

    public prefixes(): ReadonlyArray<string> { return this.#prefixesArray; }
    public prefixedValues(): ReadonlyArray<string> { return this.#prefixedValuesArray; }

    public override equals(obj?: unknown): boolean
    {
        if (this === obj) { return true; }
        if ( ! (obj instanceof StringSetPrefixArgString)) { return false; }
        if (super.value !== obj.value) { return false; }
        if (super.prefix.size !== obj.prefix.size) { return false; }

        for (const prefixString of super.prefix)
        {
            if ( ! obj.prefix.has(prefixString))
            {
                return false;
            }
        }

        return true;
    }

    public override toString(): string { return this.#string; }

    public override [inspect.custom](): string { return this.#string; }
}

export function stringSetPrefixArgString(prefixes: NonNullable<readonly string[]>, value: NonNullable<string>): StringSetPrefixArgString;
export function stringSetPrefixArgString(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>): StringSetPrefixArgString;
export function stringSetPrefixArgString(aStringSetPrefixArgString: NonNullable<StringSetPrefixArgString>): StringSetPrefixArgString;
export function stringSetPrefixArgString(prefixesOrOther: NonNullable<ReadonlySet<string> | readonly string[] | StringSetPrefixArgString>, value?: string): StringSetPrefixArgString
{
    if (prefixesOrOther instanceof StringSetPrefixArgString)
    {
        return new StringSetPrefixArgString(prefixesOrOther.prefix, prefixesOrOther.value);
    }

    if (value === undefined || value === null)
    {
        throw new TypeError(`${stringSetPrefixArgString.name}: ${value} value.`);
    }

    if (prefixesOrOther instanceof Array)
    {
        return new StringSetPrefixArgString(Object.freeze(new Set(prefixesOrOther)), value);
    }

    return new StringSetPrefixArgString(prefixesOrOther, value);
}
