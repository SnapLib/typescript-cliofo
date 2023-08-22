/**
 * This module contains all the necessary components to create an object to represent a GNU *flag* argument. GNU flag
 * arguments are generally prefixed with a single dash character and consist of a single character. Multiple flag
 * characters can be combined into a single argument.Examples of flag arguments being passed to a script are:
 *
 * ```bash
 * node-script.js -l -aC
 * ```
 *
 * `node-script.js` is the script being passed the flag arguments `l`, `a`, and `C`.
 *
 * ## Prefix and value `string` predicates
 *
 * 1. {@link flagPrefixPredicate}
 *
 *     This predicate is used to validate the prefix character of a flag (the dash, `-`, in the above example) and
 *      ensures that a `string` is:
 *     - only 1 character
 *     - and not a whitespace.
 *
 * 1. {@link flagValuePredicate}
 *
 *     This predicate is used to validate the character value of a flag (the `l`, `a`, and `C` characters in the above
 *     example) and consumes 2 `string`s and ensures that the 2nd `string` argument is:
 *     - 0-1 character(s)
 *     - not equal to the 1st string argument
 *     - and is not a whitespace.
 *
 *     The first `string` argument this predicate consumes is meant to be the prefix character to make sure it doesn't
 *     clash with the value character.
 *
 * ## {@link flagArgStringConstraint}
 *
 * The object consisting of the 2 predicates above so they can be enforced on a string and more easily referenced.
 *
 * ## {@link FlagArgString}
 *
 * All the above components combined and used in conjunction with a {@link string-prefix-arg-string.StringPrefixArgString}
 * object creates the object used to represent a GNU *flag* argument.
 *
 * @module flag-arg-string
 *
 * @see {@link constrained-arg-string}
 * @see {@link string-prefix-arg-string}
 */

import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "../string/string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /\s/;

/**
 * Predicate that consumes a `string` and returns `true` if it's:
 * - not `undefined` or `null`
 * - only a single character
 * - and is not a whitespace.
 *
 * This is used to validate the prefix (the leading part prepended to the value) of a flag argument.
 *
 * @param prefixString The `string` being checked if it's a valid flag prefix.
 *
 * @returns `true` if the passed `string` isn't `undefined` or `null`, only consists of a single character, and is not a
 *          whitespace.
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
 * Predicate that consumes 2 `string`s and returns `true` if the 2nd `string` argument is:
 * - not `undefined` or `null`
 * - 0-1 character(s)
 * - not equal to the 1st string argument
 * - and is not a whitespace.
 *
 * This is used to validate the value (the part that's appended to the prefix) of a flag argument. The first `string`
 * argument it consumes is intended be the prefix of the flag argument to ensure it doesn't clash with the value.
 *
 * This function does not perform any validation on the first `string` argument, the prefix, it's passed.
 *
 * @param prefixString The flag prefix `string` used to validate the flag value.
 *
 * @param valueString The flag value `string` being validated.
 *
 * @returns `true` if the second `string` argument is 0 or 1 characters, doesn't start with the first `string`, and
 *          doesn't contain any whitespace.
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
 * Object containing the {@link flagPrefixPredicate} and {@link flagValuePredicate} `string` predicates for validating
 * the {@link StringPrefixArgString.prefix} and {@link StringPrefixArgString.value} of a {@link StringPrefixArgString}.
 */
export const flagArgStringConstraint: ArgStringConstraint<string> = argStringConstraint(flagPrefixPredicate, flagValuePredicate);

/**
 * The class used to construct object instances to represent GNU *flag* arguments. It consists of the:
 * - {@link flagPrefixPredicate} to ensure its prefix is a single non-whitespace character.
 * - {@link flagValuePredicate} to ensure its value is a single non-whitespace character that's not equal to its prefix.
 * - {@link StringPrefixArgString} to contain its prefix and value `string`s.
 * - an optional name `string`.
 *
 * Below is an example of flag arguments being passed on the command line:
 *
 * ```bash
 * node-script.js -l -aC
 * ```
 *
 * `node-script.js` is the script being passed the flag arguments `l`, `a`, and `C`.
 *
 * @see {@link ConstrainedArgString}
 * @see {@link StringPrefixArgString}
 */
export class FlagArgString extends ConstrainedArgString<string>
{
    /**
     * Constructs an object used to represent a GNU *flag* argument with the {@link StringPrefixArgString.prefix} and
     * {@link StringPrefixArgString.value} `string`s of the passed {@link StringPrefixArgString}. If the passed
     * {@link StringPrefixArgString} object contains {@link StringPrefixArgString.prefix} and
     * {@link StringPrefixArgString.value} `string`s that fail validation, an error gets thrown.
     *
     * @param stringPrefixArgumentString The {@link StringPrefixArgString} object to use the
     *                                   {@link StringPrefixArgString.prefix} and {@link StringPrefixArgString.value}
     *                                   `string`s from.
     *
     * @param name Optional `string` used to give the flag an identifiable name.
     *
     * @throws {@link constraint-violation-error.PrefixConstraintViolationError}
     * if the passed {@link StringPrefixArgString} object contains a {@link StringPrefixArgString.prefix} that's not a
     * single character and a whitespace.
     */
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>, name?: string)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)), name ?? "");
    }
}

/**
 * Factory function for creating {@link FlagArgString} object instances with the specified prefix and value character
 * `string`s and optional name `string`.
 *
 * @param prefixChar The character prefixed to the value used to denote it as a flag.
 *
 * @param valueString The character value of the flag that's appended to its prefix.
 *
 * @param name Optional `string` used to give the flag object an identifiable name.
 *
 * @returns a {@link FlagArgString} object instance.
 */
export function flagArgString(prefixChar: NonNullable<string>, valueString: NonNullable<string>, name?: string): FlagArgString;

/**
 *
 * @param stringPrefixArgumentString
 * @param name
 */
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
