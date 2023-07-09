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

export class UndefinedOption extends ConstrainedArgumentString
{
    public constructor( argumentString: ArgumentString );
    public constructor( other: UndefinedOption );
    constructor( argumentStringOrOther: ArgumentString | UndefinedOption )
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
export function undefinedOption(undefinedOption: UndefinedOption): UndefinedOption;
export function undefinedOption(stringNumberOrArgumentString: string | ArgumentString | UndefinedOption, valueString?: string): UndefinedOption
{
    if (typeof stringNumberOrArgumentString === "string")
    {
        return new UndefinedOption(argumentString(stringNumberOrArgumentString, valueString));
    }

    if (stringNumberOrArgumentString instanceof UndefinedOption)
    {
        return new UndefinedOption(stringNumberOrArgumentString);
    }

    return new UndefinedOption(stringNumberOrArgumentString);
}

export {undefinedOption as default};
