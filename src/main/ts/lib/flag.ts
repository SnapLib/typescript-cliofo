import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { type ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgument } from "./constrained-argument-string.js";

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

export class Flag extends ConstrainedArgument
{
    public constructor(argumentString: ArgumentString)
    {
        super(flagArgumentConstraint, argumentString);
    }
}

export function flag(prefixString: string, valueString: string): Flag
{
    return new Flag(argumentString(prefixString, valueString));
}

export {flag as default};
