import { ArgString } from "./arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export class StringPrefixArgString extends ArgString<string>
{
    readonly #prefixedValue: string;
    readonly #string: string;

    public constructor(prefix: NonNullable<string>, value: NonNullable<string>)
    {
        super(prefix, value);
        this.#prefixedValue = super.prefix + super.value;
        this.#string = `${StringPrefixArgString.name} {prefix: ${stringToString(super.prefix)}, value: ${stringToString(super.value)}}`;
    }

    public override get prefixedValue(): string { return this.#prefixedValue; }

    public override equals(obj?: unknown): boolean
    {
        return    this === obj || obj instanceof StringPrefixArgString
               && super.prefix === obj.prefix && super.value === obj.value;
    }

    public override toString(): string { return this.#string; }

    public override [inspect.custom](): string { return this.#string; }
}

export function stringPrefixArgString(prefix: NonNullable<string>, value: NonNullable<string>): StringPrefixArgString;
export function stringPrefixArgString(other: NonNullable<StringPrefixArgString>): StringPrefixArgString;
export function stringPrefixArgString(prefixOrStringPrefixArgString: NonNullable<string | StringPrefixArgString>, value?: string): StringPrefixArgString
{
    if (typeof prefixOrStringPrefixArgString === "string")
    {
        if (value === undefined || value === null)
        {
            throw new Error(`${stringPrefixArgString.name}: ${value} value.`);
        }

        return new StringPrefixArgString(prefixOrStringPrefixArgString, value);
    }
    else
    {
        return new StringPrefixArgString(prefixOrStringPrefixArgString.prefix, prefixOrStringPrefixArgString.value);
    }
}

export {stringPrefixArgString as default};
