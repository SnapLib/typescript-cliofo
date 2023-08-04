import { argStringConstraint, type ArgStringConstraint, type PrefixPredicate, type ValuePredicate } from "./arg-string-constraint.js";
import { ArgString } from "./arg-string.js";
import { ConstrainedArgString } from "./constrained-arg-string.js";

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
    public constructor(argumentString: NonNullable<ArgString<string>>)
    {
        super(flagArgStringConstraint, argumentString);
    }
}

export {FlagArgString as default};
