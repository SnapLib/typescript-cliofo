import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "./string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = Object.freeze(/\s/g);

 export const optionPrefixPredicate: PrefixPredicate<string> =
    Object.freeze( (prefixString?: string): boolean =>
           prefixString !== undefined
        && prefixString !== null
        && prefixString.length > 1
        && ! whiteSpaceRegEx.test(prefixString) );

export const optionValuePredicate: ValuePredicate<string> =
    Object.freeze( (prefixString: NonNullable<string>, valueString: string) =>
           valueString !== undefined && valueString !== null && ! whiteSpaceRegEx.test(prefixString) );

export const flagArgStringConstraint: ArgStringConstraint<string> = argStringConstraint(optionPrefixPredicate, optionValuePredicate);

export class OptionArgString extends ConstrainedArgString<string>
{
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)));
    }
}

export function optionArgString(stringPrefixArgumentString: NonNullable<StringPrefixArgString>): OptionArgString;
export function optionArgString(other: NonNullable<OptionArgString>): OptionArgString;
export function optionArgString(stringPrefixArgumentStringOrOther: NonNullable<StringPrefixArgString | OptionArgString>): OptionArgString
{
    if (stringPrefixArgumentStringOrOther instanceof StringPrefixArgString)
    {
        return new OptionArgString(stringPrefixArgumentStringOrOther);
    }
    else
    {
        return new OptionArgString(stringPrefixArgString(stringPrefixArgumentStringOrOther.argString.prefix, stringPrefixArgumentStringOrOther.argString.value));
    }
}

export {optionArgString as default};
