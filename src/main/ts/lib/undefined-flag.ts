import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";
import { PrefixConstraintViolationError } from "./error/prefix-constraint-violation-error.js";

/**
 * Predicate that consumes a `string` and returns `true` if it's not `undefined`
 * or `null` and only consists of a single character.
 *
 * This is used to validate the prefixes for flag arguments.
 *
 * @param flagPrefixString The `string` being checked if it's a valid flag prefix.
 *
 * @returns `true` if the passed string isn't `undefined` or `null` and contains
 *         only a single character.
 */
export const flagPrefixPredicate: stringPredicate =
    Object.freeze(function(flagPrefixString: string): boolean
    {
        return    flagPrefixString !== undefined
               && flagPrefixString !== null
            && flagPrefixString.length === 1;
    });

/**
 * Predicate that consumes 2 `string`s and returns `true` if the second `string`
 * is empty or doesn't start with the first `string` argument.
 *
 * This is used to validate the values (the part that comes after the prefix)
 * for flags.
 *
 * @param flagPrefixString The flag prefix `string` used to validate the flag value.
 *
 * @param flagValueString The flag value `string` being validated.
 *
 * @returns `true` if the passed flag `string` value is empty or doesn't start
 *          with the flag prefix `string`.
 */
export const flagValuePredicate: biStringPredicate =
    Object.freeze( function(flagPrefixString: string, flagValueString: string)
    {
        // allow empty strings and strings that don't contain leading prefix string
        return flagValueString.length === 0 || flagValueString.slice(0, flagPrefixString.length) !== flagPrefixString;
    } );

export const flagArgumentConstraint: ArgumentConstraint = argumentConstraint(flagPrefixPredicate, flagValuePredicate);

export class UndefinedFlag extends ConstrainedArgumentString
{
    public constructor(argumentString: ArgumentString );
    public constructor(other: UndefinedFlag );
    constructor(argumentStringOrOther: ArgumentString | UndefinedFlag )
    {
        if (argumentStringOrOther instanceof ArgumentString)
        {
            super(flagArgumentConstraint, argumentStringOrOther);
        }
        else
        {
            super(argumentStringOrOther);
        }
    }
}

export function undefinedFlag(prefixString: string, valueString: string): UndefinedFlag;
export function undefinedFlag(prefixCodePoint: number, valueString: string): UndefinedFlag;
export function undefinedFlag(argumentString: ArgumentString): UndefinedFlag;
export function undefinedFlag(stringNumberOrArgumentString: string | number | ArgumentString, valueString?: string): UndefinedFlag
{
    if (typeof stringNumberOrArgumentString === "string")
    {
        return new UndefinedFlag(argumentString(stringNumberOrArgumentString, valueString));
    }

    if (typeof stringNumberOrArgumentString === "number")
    {
        if ( ! Number.isInteger(stringNumberOrArgumentString))
        {
            throw new PrefixConstraintViolationError(`passed number value is not an integer: ${stringNumberOrArgumentString}`);
        }

        return new UndefinedFlag(argumentString(String.fromCodePoint(stringNumberOrArgumentString), valueString));
    }

    return new UndefinedFlag(stringNumberOrArgumentString);
}

export {undefinedFlag as default};
