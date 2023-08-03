import { type StringOrStringSet } from "./arg-string.js";

export type PrefixPredicate<PrefixType extends StringOrStringSet> = (prefix: PrefixType) => boolean;

export type ValuePredicate<PrefixType extends StringOrStringSet> = (prefix: PrefixType, value: string) => boolean;

export class ArgStringConstraint<PrefixType extends StringOrStringSet>
{
    readonly #prefixConstraint: PrefixPredicate<PrefixType>;
    readonly #valueConstraint: ValuePredicate<PrefixType>;

    public constructor( prefixConstraint: NonNullable<PrefixPredicate<PrefixType>>,
                        valueConstraint: NonNullable<ValuePredicate<PrefixType>> );
    public constructor( other: NonNullable<ArgStringConstraint<PrefixType>> );
    constructor( prefixConstraintOrOther: NonNullable<PrefixPredicate<PrefixType> | ArgStringConstraint<PrefixType>>,
                 valueConstraint?: NonNullable<ValuePredicate<PrefixType>> )
    {
        if (prefixConstraintOrOther instanceof ArgStringConstraint)
        {
            this.#prefixConstraint = prefixConstraintOrOther.#prefixConstraint;
            this.#valueConstraint = prefixConstraintOrOther.#valueConstraint;
        }
        else
        {
            if (prefixConstraintOrOther === undefined || prefixConstraintOrOther === null)
            {
                throw new Error(`${ArgStringConstraint.name}: ${prefixConstraintOrOther} prefix constraint`);
            }

            if (valueConstraint === undefined || valueConstraint === null)
            {
                throw new Error(`${ArgStringConstraint.name}: ${valueConstraint} value constraint`);
            }

            this.#prefixConstraint = Object.isFrozen(prefixConstraintOrOther) ? prefixConstraintOrOther : Object.freeze((prefix: PrefixType) => prefixConstraintOrOther(prefix));
            this.#valueConstraint = Object.isFrozen(valueConstraint) ? valueConstraint : Object.freeze((prefix: PrefixType, valueString: string) => valueConstraint(prefix, valueString));
        }
    }

    public get prefixConstraint(): PrefixPredicate<PrefixType> { return this.#prefixConstraint; }
    public get valueConstraint(): ValuePredicate<PrefixType> { return this.#valueConstraint; }

    public isValidPrefix(prefix: PrefixType): boolean { return this.#prefixConstraint(prefix); }
    public isValidValue(prefix: PrefixType, valueString: string): boolean { return this.#valueConstraint(prefix, valueString); }

    public requireValidPrefix(prefix: PrefixType, message?: string): PrefixType
    {
        if(this.#prefixConstraint(prefix))
        {
            return prefix;
        }

        throw new Error(message);
    }

    public requireValidValue(prefix: PrefixType, valueString: string, message?: string): string
    {
        if(this.#valueConstraint(prefix, valueString))
        {
            return valueString;
        }

        throw new Error(message);
    }
}

export {ArgStringConstraint as default};
