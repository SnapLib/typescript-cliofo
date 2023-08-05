import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringSetPrefixArgString, stringSetPrefixArgString } from "./string-set-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = Object.freeze(/\s/g);

 export const operandPrefixPredicate: PrefixPredicate<ReadonlySet<string>> =
    Object.freeze( (prefixStringSet?: ReadonlySet<string>): boolean =>
    {
        if (prefixStringSet === undefined || prefixStringSet === null || prefixStringSet.size === 0) { return false; }

        for (const prefixString of prefixStringSet)
        {
            if (prefixString.length === 0 || whiteSpaceRegEx.test(prefixString)) { return false; }
        }

        return true;
    });

export const operandValuePredicate: ValuePredicate<ReadonlySet<string>> =
    Object.freeze( (prefixStringSet: NonNullable<ReadonlySet<string>>, valueString: string): boolean =>
    {
        if (valueString === undefined || valueString === null || valueString.length === 0) { return false; }
        if (whiteSpaceRegEx.test(valueString)) { return false; }

        for (const prefixString of prefixStringSet)
        {
            if (prefixString.length > 0 && valueString.startsWith(prefixString)) { return false; }
        }

        return true;
    });

export const operandArgStringConstraint: ArgStringConstraint<ReadonlySet<string>> = argStringConstraint(operandPrefixPredicate, operandValuePredicate);

export class OperandArgString extends ConstrainedArgString<ReadonlySet<string>>
{
    public constructor(stringSetPrefixArgumentString: NonNullable<StringSetPrefixArgString>)
    {
        super(operandArgStringConstraint, Object.isFrozen(stringSetPrefixArgumentString) ? stringSetPrefixArgumentString : Object.freeze(stringSetPrefixArgString(stringSetPrefixArgumentString)));
    }
}

export function operandArgString(stringPrefixArgumentString: NonNullable<StringSetPrefixArgString>): OperandArgString;
export function operandArgString(other: NonNullable<OperandArgString>): OperandArgString;
export function operandArgString(stringSetPrefixArgumentStringOrOther: NonNullable<StringSetPrefixArgString | OperandArgString>): OperandArgString
{
    if (stringSetPrefixArgumentStringOrOther instanceof StringSetPrefixArgString)
    {
        return new OperandArgString(stringSetPrefixArgumentStringOrOther);
    }
    else
    {
        return new OperandArgString(stringSetPrefixArgString(stringSetPrefixArgumentStringOrOther.argString.prefix, stringSetPrefixArgumentStringOrOther.argString.value));
    }
}

export {operandArgString as default};
