import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";

export const optionPrefixPredicate: stringPredicate =
    Object.freeze( (optionPrefixString: string) =>
        optionPrefixString !== undefined
        && optionPrefixString !== null
        && optionPrefixString.length >= 2 );

export const optionValuePredicate: biStringPredicate = Object.freeze(() => true);

export const optionArgumentConstraint: ArgumentConstraint = argumentConstraint(optionPrefixPredicate, optionValuePredicate);

export class UndefinedOption extends ConstrainedArgumentString
{
    public constructor(argumentString: ArgumentString );
    public constructor(other: UndefinedOption );
    constructor(argumentStringOrOther: ArgumentString | UndefinedOption )
    {
        if (argumentStringOrOther instanceof ArgumentString)
        {
            super(optionArgumentConstraint, argumentStringOrOther);
        }
        else
        {
            super(argumentStringOrOther);
        }
    }
}

export function undefinedOption(prefixString: string, valueString: string): UndefinedOption;
export function undefinedOption(argumentString: ArgumentString): UndefinedOption;
export function undefinedOption(stringNumberOrArgumentString: string | ArgumentString, valueString?: string): UndefinedOption
{
    if (typeof stringNumberOrArgumentString === "string")
    {
        return new UndefinedOption(argumentString(stringNumberOrArgumentString, valueString));
    }

    return new UndefinedOption(stringNumberOrArgumentString);
}

export {undefinedOption as default};
