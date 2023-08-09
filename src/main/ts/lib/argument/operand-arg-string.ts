import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringSetPrefixArgString, stringSetPrefixArgString } from "./string-set-prefix-arg-string.js";

const whiteSpaceRegEx: Readonly<RegExp> = /\s/g;

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

export function operandArgString(prefixesStringSet: NonNullable<Set<string>>, valueString: NonNullable<string>): OperandArgString;
export function operandArgString(stringSetPrefixArgumentString: NonNullable<StringSetPrefixArgString>): OperandArgString;
export function operandArgString(other: NonNullable<OperandArgString>): OperandArgString;
export function operandArgString(stringSetOrStringSetPrefixArgumentStringOrOther: NonNullable<Set<string> | StringSetPrefixArgString | OperandArgString>, valueString?: string): OperandArgString
{
    if (stringSetOrStringSetPrefixArgumentStringOrOther instanceof Set)
    {
        if (valueString === undefined || valueString === null)
        {
            throw new Error(`${operandArgString.name}: ${valueString} value string argument.`);
        }

        return new OperandArgString(stringSetPrefixArgString((stringSetOrStringSetPrefixArgumentStringOrOther), valueString));
    }
    else if (stringSetOrStringSetPrefixArgumentStringOrOther instanceof StringSetPrefixArgString)
    {
        return new OperandArgString(stringSetOrStringSetPrefixArgumentStringOrOther);
    }
    else
    {
        return new OperandArgString(stringSetPrefixArgString(stringSetOrStringSetPrefixArgumentStringOrOther.argString.prefix, stringSetOrStringSetPrefixArgumentStringOrOther.argString.value));
    }
}

export {operandArgString as default};
