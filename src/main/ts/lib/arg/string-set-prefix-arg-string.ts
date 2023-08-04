import { ArgString } from "./arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string): string => aString.length != 1 ? `"${aString}"` : `'${aString}'`;
const stringArrayToString = (strings: ReadonlyArray<string>) => `[${strings.map(aString => stringToString(aString)).join(", ")}]`;

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

export function stringSetPrefixArgString(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>): StringSetPrefixArgString;
export function stringSetPrefixArgString(aStringSetPrefixArgString: NonNullable<StringSetPrefixArgString>): StringSetPrefixArgString;
export function stringSetPrefixArgString(prefixesOrOther: NonNullable<ReadonlySet<string> | StringSetPrefixArgString>, value?: string): StringSetPrefixArgString
{
    if (prefixesOrOther instanceof StringSetPrefixArgString)
    {
        return new StringSetPrefixArgString(prefixesOrOther.prefix, prefixesOrOther.value);
    }

    if (value === undefined || value === null)
    {
        throw new TypeError(`${stringSetPrefixArgString.name}: ${value} value.`);
    }

    return new StringSetPrefixArgString(prefixesOrOther, value);
}
