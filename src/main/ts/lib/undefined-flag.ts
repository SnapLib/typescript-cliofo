import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";

export const flagPrefixPredicate: stringPredicate =
    Object.freeze(
        (flagPrefixString: string) =>    flagPrefixString !== undefined
                                      && flagPrefixString !== null
                                      && flagPrefixString.length === 1
    );

export const flagValuePredicate: biStringPredicate =
    Object.freeze( (flagPrefixString: string, flagValueString: string) =>
    {
        if (    flagPrefixString !== undefined
             && flagPrefixString !== null
             && flagValueString !== undefined
             && flagValueString !== null )
        {
            return false;
        }

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
export function undefinedFlag(argumentString: ArgumentString): UndefinedFlag;
export function undefinedFlag(prefixStringOrArgumentString: string | ArgumentString, valueString?: string): UndefinedFlag
{
    if (typeof prefixStringOrArgumentString === "string")
    {
        return new UndefinedFlag(argumentString(prefixStringOrArgumentString, valueString));
    }
    else
    {
        return new UndefinedFlag(prefixStringOrArgumentString);
    }
}

export {undefinedFlag as default};
