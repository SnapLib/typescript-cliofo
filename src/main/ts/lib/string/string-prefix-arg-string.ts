import { ArgString } from "./arg-string.js";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

/**
 * This class is used to create objects that represent string arguments consisting
 * of `string` prefixes prepended to `string` values that can be passed on the
 * command line.
 *
 * @remarks
 * This API's {@link FlagArgString} and {@link OptionArgString} classes inherit
 * from this class as those classes can only have single `string` prefixes.
 *
 * @see {@link FlagArgString}
 * @see {@link OptionArgString}
 */
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

    /**
     * Returns this object's prefixed `string` value property consisting of this
     * object's prefix `string` property prepended to this object's `string`
     * value property.
     *
     * @returns this object's prefixed `string` value property.
     */
    public override get prefixedValue(): string { return this.#prefixedValue; }

    /**
     * Returns `true` if the passed argument is a {@link StringPrefixArgString}
     * object prefix and value `string` properties equal to this object's prefix
     * and value `string` property.
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

export function stringPrefixArgString(prefix: NonNullable<string>, value: NonNullable<string>): StringPrefixArgString;
export function stringPrefixArgString(aStringPrefixArgString: NonNullable<StringPrefixArgString>): StringPrefixArgString;
export function stringPrefixArgString(prefixOrStringPrefixArgString: NonNullable<string | StringPrefixArgString>, value?: string): StringPrefixArgString
{
    if (typeof prefixOrStringPrefixArgString === "string")
    {
        if (value === undefined || value === null)
        {
            throw new TypeError(`${stringPrefixArgString.name}: ${value} value.`);
        }

        return new StringPrefixArgString(prefixOrStringPrefixArgString, value);
    }
    else
    {
        return new StringPrefixArgString(prefixOrStringPrefixArgString.prefix, prefixOrStringPrefixArgString.value);
    }
}

export {stringPrefixArgString as default};
