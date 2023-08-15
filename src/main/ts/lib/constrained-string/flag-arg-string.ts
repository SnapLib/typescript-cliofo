/**
 * This module contains all the necessary components to create an object to represent a GNU *flag* argument.
 *
 * ## Prefix and value `string` predicates
 *
 * 1. {@link flagPrefixPredicate}
 *
 *     This predicate ensures that a `string` is only 1 character and not a whitespace.
 *
 * 1. {@link flagValuePredicate}
 *
 *     This predicate ensures that a `string` is 0-1 character(s) long, is not a specified character,
 *     and does not contain any white space.
 *
 * ## {@link flagArgStringConstraint}
 *
 * The object consisting of the 2 predicates above so they can be enforced on a string and more easily referenced.
 *
 * ## {@link FlagArgString}
 *
 * The class bringing all the above components together combined with a {@link string-prefix-arg-string.StringPrefixArgString}
 * for creating an object used to represent a GNU *flag* argument.
 *
 * @module flag-arg-string
 *
 * @see {@link constrained-arg-string}
 * @see {@link string-prefix-arg}
 */

import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "../string/string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /\s/g;

/**
 * Predicate that consumes a `string` and returns `true` if it's not `undefined`
 * or `null`, only consists of a single character, and is not a whitespace.
 *
 * This is used to validate the prefixes (the leading part prepended to the value) of flag arguments.
 *
 * @param prefixString The `string` being checked if it's a valid flag prefix.
 *
 * @returns `true` if the passed `string` isn't `undefined` or `null`, only
 * consists of a single character, and is not a whitespace.
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
 * argument is 0 or 1 characters, doesn't start with the first `string`, and
 * doesn't contain any whitespace.
 *
 * This is used to validate the value (the part that's appended to the prefix)
 * of flag arguments.
 *
 * This function does not perform any validation on the first `string` argument
 * it's passed.
 *
 * @param prefixString The prefix `string` used to validate the flag value.
 *
 * @param valueString The flag value `string` being validated.
 *
 * @returns `true` if the second `string` argument is 0 or 1 characters, doesn't
 *          start with the first `string`, and doesn't contain any whitespace.
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

/**
 * Object containing the {@link flagPrefixPredicate} and {@link flagValuePredicate}
 * `string` predicates for validating the {@link StringPrefixArgString.prefix}
 * and {@link StringPrefixArgString.value} of a {@link StringPrefixArgString}.
 */
export const flagArgStringConstraint: ArgStringConstraint<string> = argStringConstraint(flagPrefixPredicate, flagValuePredicate);

export class FlagArgString extends ConstrainedArgString<string>
{
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>, name?: string)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)), name ?? "");
    }
}

export function flagArgString(prefixChar: NonNullable<string>, valueString: NonNullable<string>, name?: string): FlagArgString;
export function flagArgString(stringPrefixArgumentString: NonNullable<StringPrefixArgString>, name?: string): FlagArgString;
export function flagArgString(other: NonNullable<FlagArgString>, name?: string): FlagArgString;
export function flagArgString(prefixCharOrStringPrefixArgumentStringOrOther: NonNullable<string | StringPrefixArgString | FlagArgString>, valueString?: string, name?: string): FlagArgString
{
    if (typeof prefixCharOrStringPrefixArgumentStringOrOther === "string")
    {
        if (valueString === undefined || valueString === null)
        {
            throw new TypeError(`${flagArgString.name}: ${valueString} value string argument.`);
        }

        return new FlagArgString((stringPrefixArgString(prefixCharOrStringPrefixArgumentStringOrOther, valueString)));
    }
    else if (prefixCharOrStringPrefixArgumentStringOrOther instanceof StringPrefixArgString)
    {
        return new FlagArgString(prefixCharOrStringPrefixArgumentStringOrOther, name);
    }
    else
    {
        return new FlagArgString(stringPrefixArgString(prefixCharOrStringPrefixArgumentStringOrOther.argString.prefix, prefixCharOrStringPrefixArgumentStringOrOther.argString.value), name);
    }
}

export {flagArgString as default};
