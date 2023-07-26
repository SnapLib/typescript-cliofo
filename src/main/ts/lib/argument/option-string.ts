import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";

export const optionPrefixPredicate: stringPredicate =
    Object.freeze( (optionPrefixString: string) =>
        optionPrefixString !== undefined
        && optionPrefixString !== null
        && optionPrefixString.length > 1 );

export const optionValuePredicate: biStringPredicate = Object.freeze(() => true);

export const optionArgumentConstraint: ArgumentConstraint = argumentConstraint(optionPrefixPredicate, optionValuePredicate);

export class OptionString extends ConstrainedArgumentString
{
    public constructor( argumentString: ArgumentString );
    public constructor( other: OptionString );
    constructor( argumentStringOrOther: ArgumentString | OptionString )
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

    public is(aString: string): boolean
    {
        return this.argString.prefixedValue === aString;
    }
}

export function optionString(prefixString: string, valueString: string): OptionString;
export function optionString(argumentString: ArgumentString): OptionString;
export function optionString(undefinedOption: OptionString): OptionString;
export function optionString(stringNumberArgumentStringOrUndefinedOption: string | ArgumentString | OptionString, valueString?: string): OptionString
{
    if (typeof stringNumberArgumentStringOrUndefinedOption === "string")
    {
        return new OptionString(argumentString(stringNumberArgumentStringOrUndefinedOption, valueString));
    }

    if (stringNumberArgumentStringOrUndefinedOption instanceof ArgumentString)
    {
        return new OptionString(stringNumberArgumentStringOrUndefinedOption);
    }

    return new OptionString(stringNumberArgumentStringOrUndefinedOption);
}

export {optionString as default};
