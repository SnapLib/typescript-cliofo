/**
 * This module contains the {@link ArgStringConstraint} class used by the
 * {@link constrained-arg-string.ConstrainedArgString} class to enforce constraints on the
 * {@link arg-string.ArgString.prefix} and {@link arg-string.ArgString.value} properties of {@link arg-string.ArgString}
 * objects.
 *
 * This module also contains the {@link PrefixPredicate} and {@link ValuePredicate} types used by the
 * {@link ArgStringConstraint} class' as the types for its {@link ArgStringConstraint.prefixConstraint} and
 * {@link ArgStringConstraint.valueConstraint} properties.
 *
 * @module arg-string-constraint
 *
 * @see {@link constrained-arg-string}
 * @see {@link arg-string}
 */

import { type StringOrReadonlyStringSet } from "../string/arg-string.js";
import { PrefixConstraintViolationError, ValueConstraintViolationError } from "./constraint-violation-error.js";

/**
 * This type defines a {@link StringOrReadonlyStringSet} predicate that can be used to validate a `string` or
 * `ReadonlySet<string>` argument such as the {@link arg-string.ArgString.prefix ArgString prefix}.
 */
export type PrefixPredicate<PrefixType extends StringOrReadonlyStringSet> = (prefix?: PrefixType) => boolean;

/**
 * This type defines a predicate that consumes a {@link StringOrReadonlyStringSet} and a `string` and can be used to
 * validate a `string` or `ReadonlySet<string>` and `string` argument such as the
 * {@link arg-string.ArgString.value ArgString value} while also being able to take an
 * {@link arg-string.ArgString.prefix ArgString prefix} into account as well.
 */
export type ValuePredicate<PrefixType extends StringOrReadonlyStringSet> = (prefix: NonNullable<PrefixType>, value: string) => boolean;

/**
 * This class creates objects that contain predicates that can be used to validate {@link StringOrReadonlyStringSet}
 * (`string` or `ReadonlySet<string>`) arguments. These predicates are contained within the
 * {@link ArgStringConstraint.prefixConstraint} and  {@link ArgStringConstraint.valueConstraint} properties and are
 * capable of validating {@link arg-string.ArgString.prefix} and {@link arg-string.ArgString.value} properties of
 * {@link arg-string.ArgString} objects. The {@link constrained-arg-string.ConstrainedArgString} class uses this class
 * to accomplish that task.
 *
 * @see {@link constrained-arg-string.ConstrainedArgString}
 * @see {@link arg-string.ArgString}
 */
export class ArgStringConstraint<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #prefixConstraint: PrefixPredicate<PrefixType>;
    readonly #valueConstraint: ValuePredicate<PrefixType>;

    /**
     * Constructs a new {@link ArgStringConstraint} object instance with the provided prefix and value constraint
     * predicates set to its {@link ArgStringConstraint.prefixConstraint} and
     * {@link ArgStringConstraint.valueConstraint} properties.
     *
     * @param prefixConstraint
     * A {@link PrefixPredicate} that consumes a `string` r `ReadonlySet<string>` and returns a `boolean`.
     *
     * @param valueConstraint
     * A {@link ValuePredicate} that consumes a `string` or `ReadonlySet<string>` and a `string` and returns a `boolean`.
     *
     * @throws {@link PrefixConstraintError} if the passed prefix constraint argument is `undefined` or `null`.
     *
     * @throws {@link ValueConstraintError} if the passed value constraint argument is `undefined` or `null`.
     */
    public constructor( prefixConstraint: NonNullable<PrefixPredicate<PrefixType>>,
                        valueConstraint: NonNullable<ValuePredicate<PrefixType>> )
    {
        if (prefixConstraint === undefined || prefixConstraint === null)
        {
            throw new PrefixConstraintError(`${new.target.name}: ${prefixConstraint} prefix constraint`);
        }

        if (valueConstraint === undefined || valueConstraint === null)
        {
            throw new ValueConstraintError(`${new.target.name}: ${valueConstraint} value constraint`);
        }

        this.#prefixConstraint = Object.isFrozen(prefixConstraint) ? prefixConstraint : Object.freeze((prefix?: PrefixType) => prefixConstraint(prefix));
        this.#valueConstraint = Object.isFrozen(valueConstraint) ? valueConstraint : Object.freeze((prefix: PrefixType, valueString: string) => valueConstraint(prefix, valueString));
    }

    /** This object's {@link PrefixPredicate} `string` or `ReadonlySet<string>` predicate function. */
    public get prefixConstraint(): PrefixPredicate<PrefixType> { return this.#prefixConstraint; }

    /** This object's {@link ValuePredicate} `string` or `ReadonlySet<string>` and `string` predicate function. */
    public get valueConstraint(): ValuePredicate<PrefixType> { return this.#valueConstraint; }

    /**
     * Returns the `boolean` result of passing the provided `string` or `ReadonlySet<string>`
     * argument to this object's {@link ArgStringConstraint.prefixConstraint}
     *
     * @param prefix A `string` or `ReadonlySet<string>` to pass to this object's
     *               {@link ArgStringConstraint.prefixConstraint} to validate.
     *
     * @returns The `boolean` result of passing the provided `string` or
     *          `ReadonlySet<string>` to this object's {@link ArgStringConstraint.prefixConstraint}
     */
    public isValidPrefix(prefix: PrefixType): boolean { return this.#prefixConstraint(prefix); }

    /**
     * Returns the `boolean` result of passing the provided `string` or `ReadonlySet<string>`
     * and `string` argument to this object's {@link ArgStringConstraint.prefixConstraint}.
     *
     * @param prefix A `string` or `ReadonlySet<string>` to pass to this object's
     *               {@link ArgStringConstraint.valueConstraint} to validate.
     *
     * @param valueString A `string` to pass to this object's
     *                    {@link ArgStringConstraint.valueConstraint} to validate.
     *
     * @returns The `boolean` result of passing the provided `string` or `ReadonlySet<string>`
     *          and `string` argument to this object's {@link ArgStringConstraint.prefixConstraint}.
     */
    public isValidValue(prefix: PrefixType, valueString: string): boolean { return this.#valueConstraint(prefix, valueString); }

    /**
     * Returns the passed `string` or `ReadonlySet<string>` if it's valid,
     * otherwise throws {@link PrefixConstraintViolationError}.
     *
     * @param prefix The `string` or `ReadonlySet<string>` being validated.
     *
     * @param message Optional `string` to use as the error message if validation fails.
     *
     * @returns The passed `string` or `ReadonlySet<string>` if it's valid,
     *          otherwise throws {@link PrefixConstraintViolationError}.
     *
     * @throws {@link constraint-violation-error.PrefixConstraintViolationError}
     *         if passed `string` or `ReadonlySet<string>` fails validation.
     */
    public requireValidPrefix(prefix: PrefixType, message?: string): PrefixType
    {
        if(this.#prefixConstraint(prefix))
        {
            return prefix;
        }

        throw new PrefixConstraintViolationError(message);
    }

    /**
     * Returns the passed `string` if it's valid, otherwise throws {@link ValueConstraintViolationError}.
     *
     * @param prefix The `string` or `ReadonlySet<string>` that could be used as
     *               part of the validation..
     *
     * @param valueString The `string` being validated.
     *
     * @param message Optional `string` to use as the error message if validation fails.
     *
     * @returns The passed `string` or `ReadonlySet<string>` if it's valid,
     *          otherwise throws {@link PrefixConstraintViolationError}.
     *
     * @throws {@link constraint-violation-error.ValueConstraintViolationError}
     *         if passed `string` fails validation.
     */
    public requireValidValue(prefix: PrefixType, valueString: string, message?: string): string
    {
        if(this.#valueConstraint(prefix, valueString))
        {
            return valueString;
        }

        throw new ValueConstraintViolationError(message);
    }
}

/**
 * Creates a new {@link ArgStringConstraint} object instance with its
 * {@link ArgStringConstraint.prefixConstraint} and {@link ArgStringConstraint.valueConstraint}
 * properties set via the provided arguments.
 *
 * @param prefixConstraint The {@link PrefixPredicate} to set the returned
 *                         {@link ArgStringConstraint} object instance's
 *                         {@link ArgStringConstraint.prefixConstraint} property to.
 *
 * @param valueConstraint The {@link ValuePredicate} to set the returned
 *                         {@link ArgStringConstraint} object instance's
 *                         {@link ArgStringConstraint.valueConstraint} property to.
 *
 * @returns a new {@link ArgStringConstraint} object instance.
 */
export function argStringConstraint<PrefixType extends StringOrReadonlyStringSet>(
    prefixConstraint: NonNullable<PrefixPredicate<PrefixType>>,
    valueConstraint: NonNullable<ValuePredicate<PrefixType>>
): ArgStringConstraint<PrefixType>;

/**
 * Creates a new {@link ArgStringConstraint} object instance copying the
 * {@link ArgStringConstraint.prefixConstraint} and {@link ArgStringConstraint.valueConstraint}
 * properties from a pre-existing {@link ArgStringConstraint} object instance.
 *
 * @param other The {@link ArgStringConstraint} to copy  {@link ArgStringConstraint.prefixConstraint}
 * and {@link ArgStringConstraint.valueConstraint} properties from.
 *
 * @returns a new {@link ArgStringConstraint} object instance.
 */
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

/**
 * Error thrown by the {@link ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the prefix constraint argument.
 */
export class PrefixConstraintError extends Error
{
    public override readonly name: string = PrefixConstraintError.name;

    /**
     * Constructs a new {@link PrefixConstraintError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * Error thrown by the {@link ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the value constraint argument.
 */
export class ValueConstraintError extends Error
{
    public override readonly name: string = ValueConstraintError.name;

    /**
     * Constructs a new {@link ValueConstraintError} with the optional `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default argStringConstraint;
