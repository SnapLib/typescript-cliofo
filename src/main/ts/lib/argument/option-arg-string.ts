import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "./string/string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /\s/g;

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

export function optionArgString(prefixString: NonNullable<string>, valueString: NonNullable<string>): OptionArgString;
export function optionArgString(stringPrefixArgumentString: NonNullable<StringPrefixArgString>): OptionArgString;
export function optionArgString(other: NonNullable<OptionArgString>): OptionArgString;
export function optionArgString(prefixStringOrStringPrefixArgumentStringOrOther: NonNullable<string | StringPrefixArgString | OptionArgString>, valueString?: string): OptionArgString
{
    if (typeof prefixStringOrStringPrefixArgumentStringOrOther === "string")
    {
        if (valueString === undefined || valueString === null)
        {
            throw new Error(`${optionArgString.name}: ${valueString} value string argument.`);
        }

        return new OptionArgString((stringPrefixArgString(prefixStringOrStringPrefixArgumentStringOrOther, valueString)));
    }
    else if (prefixStringOrStringPrefixArgumentStringOrOther instanceof StringPrefixArgString)
    {
        return new OptionArgString(prefixStringOrStringPrefixArgumentStringOrOther);
    }
    else
    {
        return new OptionArgString(stringPrefixArgString(prefixStringOrStringPrefixArgumentStringOrOther.argString.prefix, prefixStringOrStringPrefixArgumentStringOrOther.argString.value));
    }
}

export {optionArgString as default};
