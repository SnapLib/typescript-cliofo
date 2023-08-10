import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "./string/string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /\s/g;

/**
 * Predicate that consumes a `string` and returns `true` if it's not `undefined`
 * or `null` and only consists of a single character.
 *
 * This is used to validate the prefixes for flag arguments.
 *
 * @param prefixString The `string` being checked if it's a valid flag prefix.
 *
 * @returns `true` if the passed string isn't `undefined` or `null` and contains
 *         only a single character.
 *
 * @see FlagArgString
 */
 export const flagPrefixPredicate: PrefixPredicate<string> =
    Object.freeze( (prefixString?: string): boolean =>
           prefixString !== undefined
        && prefixString !== null
        && prefixString.length === 1
        && ! whiteSpaceRegEx.test(prefixString) );

/**
 * Predicate that consumes 2 `string`s and returns `true` if the second `string`
 * argument is 0 or 1 characters and doesn't start with the first `string`.
 *
 * This is used to validate the value (the part that comes after the prefix)
 * for flags.
 *
 * This function does not perform any validation on the first `string` argument
 * it's passed.
 *
 * @param prefixString The prefix `string` used to validate the flag value.
 *
 * @param valueString The flag value `string` being validated.
 *
 * @returns `true` if the passed flag `string` value is 0 or 1 characters and
 *          doesn't consist of the first `string`.
 *
 * @see FlagArgString
 */
export const flagValuePredicate: ValuePredicate<string> =
    Object.freeze( (prefixString: NonNullable<string>, valueString: string) =>
           valueString !== undefined
        && valueString !== null
        && valueString.length <= 1
        && ! valueString.startsWith(prefixString)
        && ! whiteSpaceRegEx.test(valueString) );

export const flagArgStringConstraint: ArgStringConstraint<string> = argStringConstraint(flagPrefixPredicate, flagValuePredicate);

export class FlagArgString extends ConstrainedArgString<string>
{
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)));
    }
}

export function flagArgString(prefixChar: NonNullable<string>, valueString: NonNullable<string>): FlagArgString;
export function flagArgString(stringPrefixArgumentString: NonNullable<StringPrefixArgString>): FlagArgString;
export function flagArgString(other: NonNullable<FlagArgString>): FlagArgString;
export function flagArgString(prefixCharOrStringPrefixArgumentStringOrOther: NonNullable<string | StringPrefixArgString | FlagArgString>, valueString?: string): FlagArgString
{
    if (typeof prefixCharOrStringPrefixArgumentStringOrOther === "string")
    {
        if (valueString === undefined || valueString === null)
        {
            throw new Error(`${flagArgString.name}: ${valueString} value string argument.`);
        }

        return new FlagArgString((stringPrefixArgString(prefixCharOrStringPrefixArgumentStringOrOther, valueString)));
    }
    else if (prefixCharOrStringPrefixArgumentStringOrOther instanceof StringPrefixArgString)
    {
        return new FlagArgString(prefixCharOrStringPrefixArgumentStringOrOther);
    }
    else
    {
        return new FlagArgString(stringPrefixArgString(prefixCharOrStringPrefixArgumentStringOrOther.argString.prefix, prefixCharOrStringPrefixArgumentStringOrOther.argString.value));
    }
}

export {flagArgString as default};
