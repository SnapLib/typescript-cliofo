import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";
import { PrefixConstraintViolationError } from "./error/prefix-constraint-violation-error.js";

export const flagPrefixPredicate: stringPredicate =
    Object.freeze(
        (flagPrefixString: string) =>    flagPrefixString !== undefined
                                      && flagPrefixString !== null
                                      && flagPrefixString.length === 1
    );

export const flagValuePredicate: biStringPredicate =
    Object.freeze( (flagPrefixString: string, flagValueString: string) =>
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
    else if (typeof stringNumberOrArgumentString === "number")
    {
        if ( ! Number.isInteger(stringNumberOrArgumentString))
        {
            throw new PrefixConstraintViolationError(`passed number value is not an integer: ${stringNumberOrArgumentString}`);
        }

        return new UndefinedFlag(argumentString(String.fromCodePoint(stringNumberOrArgumentString), valueString));
    }
    else
    {
        return new UndefinedFlag(stringNumberOrArgumentString);
    }
}

export {undefinedFlag as default};
