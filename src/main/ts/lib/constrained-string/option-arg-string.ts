/**
 * @module option-arg-string
 */

import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString } from "../string/string-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /^\s$/;

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
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>, name?: string)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)), name ?? stringPrefixArgumentString.value);
    }
}

export function optionArgString(prefixString: NonNullable<string>, valueString: NonNullable<string>, name?: string): OptionArgString;
export function optionArgString(stringPrefixArgumentString: NonNullable<StringPrefixArgString>, name?: string): OptionArgString;
export function optionArgString(other: NonNullable<OptionArgString>, name?: string): OptionArgString;
export function optionArgString(prefixStringOrStringPrefixArgumentStringOrOther: NonNullable<string | StringPrefixArgString | OptionArgString>, valueString?: string, name?: string): OptionArgString
{
    if (typeof prefixStringOrStringPrefixArgumentStringOrOther === "string")
    {
        if (valueString === undefined || valueString === null)
        {
            throw new TypeError(`${optionArgString.name}: ${valueString} value string argument.`);
        }

        return new OptionArgString((stringPrefixArgString(prefixStringOrStringPrefixArgumentStringOrOther, valueString)), name);
    }
    else if (prefixStringOrStringPrefixArgumentStringOrOther instanceof StringPrefixArgString)
    {
        return new OptionArgString(prefixStringOrStringPrefixArgumentStringOrOther, name);
    }
    else
    {
        return new OptionArgString(stringPrefixArgString(prefixStringOrStringPrefixArgumentStringOrOther.argString.prefix, prefixStringOrStringPrefixArgumentStringOrOther.argString.value), name);
    }
}

export {optionArgString as default};
