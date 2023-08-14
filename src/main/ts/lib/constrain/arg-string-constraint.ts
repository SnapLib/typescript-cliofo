/**
 * @module arg-string-constraint
 */

import { type StringOrReadonlyStringSet } from "../string/arg-string.js";
import { PrefixConstraintError, ValueConstraintError } from "./error/arg-string-constraint-error.js";
import { PrefixConstraintViolationError, ValueConstraintViolationError } from "./error/constraint-violation-error.js";

/**
 * This type defines a {@link StringOrReadonlyStringSet} predicate that can be
 * used to validate a `string` or `ReadonlySet<string>` argument. This predicate
 * is intended to be used to validate the {@link arg-string.ArgString.prefix}.
 */
export type PrefixPredicate<PrefixType extends StringOrReadonlyStringSet> = (prefix?: PrefixType) => boolean;

export type ValuePredicate<PrefixType extends StringOrReadonlyStringSet> = (prefix: NonNullable<PrefixType>, value: string) => boolean;

export class ArgStringConstraint<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefixConstraint: PrefixPredicate<PrefixType>;
    readonly #valueConstraint: ValuePredicate<PrefixType>;

    public constructor( prefixConstraint: NonNullable<PrefixPredicate<PrefixType>>,
                        valueConstraint: NonNullable<ValuePredicate<PrefixType>> )
    {
        if (prefixConstraint === undefined || prefixConstraint === null)
        {
            throw new PrefixConstraintError(`${ArgStringConstraint.name}: ${prefixConstraint} prefix constraint`);
        }

        if (valueConstraint === undefined || valueConstraint === null)
        {
            throw new ValueConstraintError(`${ArgStringConstraint.name}: ${valueConstraint} value constraint`);
        }

        this.#prefixConstraint = Object.isFrozen(prefixConstraint) ? prefixConstraint : Object.freeze((prefix?: PrefixType) => prefixConstraint(prefix));
        this.#valueConstraint = Object.isFrozen(valueConstraint) ? valueConstraint : Object.freeze((prefix: PrefixType, valueString: string) => valueConstraint(prefix, valueString));
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

        throw new PrefixConstraintViolationError(message);
    }

    public requireValidValue(prefix: PrefixType, valueString: string, message?: string): string
    {
        if(this.#valueConstraint(prefix, valueString))
        {
            return valueString;
        }

        throw new ValueConstraintViolationError(message);
    }
}

export function argStringConstraint<PrefixType extends StringOrReadonlyStringSet>(
    prefixConstraint: NonNullable<PrefixPredicate<PrefixType>>,
    valueConstraint: NonNullable<ValuePredicate<PrefixType>>
): ArgStringConstraint<PrefixType>;
export function argStringConstraint<PrefixType extends StringOrReadonlyStringSet>(
    other: NonNullable<ArgStringConstraint<PrefixType>>
): ArgStringConstraint<PrefixType>;
export function argStringConstraint<PrefixType extends StringOrReadonlyStringSet>(
    prefixConstraintOrOther: NonNullable<PrefixPredicate<PrefixType> | ArgStringConstraint<PrefixType>>,
    valueConstraint?: ValuePredicate<PrefixType>
): ArgStringConstraint<PrefixType>
{
    if (prefixConstraintOrOther instanceof ArgStringConstraint)
    {
        return new ArgStringConstraint(prefixConstraintOrOther.prefixConstraint, prefixConstraintOrOther.valueConstraint);
    }
    else
    {
        if (valueConstraint === undefined || valueConstraint === null)
        {
            throw new TypeError(`${argStringConstraint.name}: ${valueConstraint} value constraint.`);
        }

        return new ArgStringConstraint(prefixConstraintOrOther, valueConstraint);
    }
}

export {argStringConstraint as default};
