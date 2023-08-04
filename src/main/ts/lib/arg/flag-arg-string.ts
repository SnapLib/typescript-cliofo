import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";
import { StringPrefixArgString, stringPrefixArgString as stringPrefixArgString } from "./string-prefix-arg-string.js";

 export const flagPrefixPredicate: PrefixPredicate<string> =
    Object.freeze( (prefixString?: string): boolean =>
           prefixString !== undefined
        && prefixString !== null
        && prefixString.length === 1 );

export const flagValuePredicate: ValuePredicate<string> =
    Object.freeze( (prefixString: NonNullable<string>, valueString: string) =>
           valueString !== undefined
        && valueString !== null
        && valueString.length > 0
        && ! valueString.startsWith(prefixString) );

export const flagArgStringConstraint: ArgStringConstraint<string> = argStringConstraint(flagPrefixPredicate, flagValuePredicate);

export class FlagArgString extends ConstrainedArgString<string>
{
    public constructor(stringPrefixArgumentString: NonNullable<StringPrefixArgString>)
    {
        super(flagArgStringConstraint, Object.isFrozen(stringPrefixArgumentString) ? stringPrefixArgumentString : Object.freeze(stringPrefixArgString(stringPrefixArgumentString)));
    }
}

export {FlagArgString as default};
