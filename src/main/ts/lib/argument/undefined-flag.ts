import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";
import { PrefixConstraintViolationError } from "./error/prefix-constraint-violation-error.js";
import { operandValuePredicate } from "./undefined-operand.js";

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
    Object.freeze( (flagPrefixString: string): boolean =>
        flagPrefixString !== undefined
        && flagPrefixString !== null
        && flagPrefixString.length === 1 );

/**
 * Predicate that consumes 2 `string`s and returns `true` if the second `string`
 * argument is empty or doesn't start with the first `string` argument.
 *
 * This is used to validate the values (the part that comes after the prefix)
 * for flags.
 *
 * @param flagPrefixString The prefix `string` used to validate the flag value.
 *
 * @param flagValueString The flag value `string` being validated.
 *
 * @returns `true` if the passed flag `string` value is empty or doesn't start
 *          with the flag prefix `string`.
 */
export const flagValuePredicate: biStringPredicate = operandValuePredicate;

export const flagArgumentConstraint: ArgumentConstraint = argumentConstraint(flagPrefixPredicate, flagValuePredicate);

export class UndefinedFlag extends ConstrainedArgumentString
{
    public constructor( argumentString: ArgumentString );
    public constructor( undefinedFlag: UndefinedFlag );
    constructor( argumentStringOrUndefinedFlag: ArgumentString | UndefinedFlag )
    {
        if (argumentStringOrUndefinedFlag instanceof ArgumentString)
        {
            super(flagArgumentConstraint, argumentStringOrUndefinedFlag);
        }
        else
        {
            super(argumentStringOrUndefinedFlag);
        }
    }
}

export function undefinedFlag(prefixString: string, valueString: string): UndefinedFlag;
export function undefinedFlag(prefixCodePoint: number, valueString: string): UndefinedFlag;
export function undefinedFlag(argumentString: ArgumentString): UndefinedFlag;
export function undefinedFlag(undefinedFlag: UndefinedFlag): UndefinedFlag;
export function undefinedFlag(stringNumberOrArgumentString: string | number | ArgumentString | UndefinedFlag , valueString?: string): UndefinedFlag
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

    if (stringNumberOrArgumentString instanceof ArgumentString)
    {
        return new UndefinedFlag(stringNumberOrArgumentString);
    }

    return new UndefinedFlag(stringNumberOrArgumentString);
}

export {undefinedFlag as default};
