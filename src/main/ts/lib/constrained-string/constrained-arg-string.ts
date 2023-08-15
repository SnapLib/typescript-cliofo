/**
 * This module contains the {@link ConstrainedArgString} abstract class which is
 * the root parent class the {@link operand-arg-string.OperandArgString},
 * {@link flag-arg-string.FlagArgString}, and {@link option-arg-string.OptionArgString}
 * classes inherit from.
 *
 * The {@link ConstrainedArgString} abstract class uses its {@link arg-string-constraint.ArgStringConstraint}
 * {@link ConstrainedArgString.argStringConstraint} to enforce constraints on
 * its {@link arg-string.ArgString} {@link ConstrainedArgString.argString} property. If a
 * {@link ConstrainedArgString} object attempts to be instantiated with an
 * {@link arg-string.ArgString} that violates its {@link ConstrainedArgString.argStringConstraint},
 * an error gets thrown.
 *
 * @module constrained-arg-string
 *
 * @see {@link arg-string-constraint}
 * @see {@link operand-arg-string}
 * @see {@link flag-arg-string}
 * @see {@link option-arg-string}
 * @see {@link arg-string}
 */

import { type ArgStringConstraint, argStringConstraint as createArgStringConstraint } from "./arg-string-constraint.js";
import { type ArgString, type StringOrReadonlyStringSet } from "../string/arg-string.js";
import { PrefixConstraintViolationError, ValueConstraintViolationError } from "./error/constraint-violation-error.js";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length !== 1 ? `"${aString}"` : `'${aString}'`;

const stringOrStringSetToString = (stringOrStringSet: string | ReadonlySet<string>) =>
{
    if (typeof stringOrStringSet === "string")
    {
        return stringToString(stringOrStringSet);
    }
    else
    {
        return `[${Array.from(stringOrStringSet).map(aString => stringToString(aString)).join(", ")}]`;
    }
};

/**
 * This class is used to create objects that enforce constraints on the
 * {@link ArgString.prefix} and {@link ArgString.value} properties of {@link ArgString}
 * objects. It does this by having a {@link ArgStringConstraint}
 * {@link ConstrainedArgString.argStringConstraint} and {@link ArgString} {@link ConstrainedArgString.argString}
 * property. If a {@link ConstrainedArgString} object attempts to be instantiated with an
 * {@link ArgString} that violates its {@link ConstrainedArgString.argStringConstraint},
 * an error gets thrown.
 *
 * @typeParam PrefixType The type of {@link StringOrReadonlyStringSet} prefix,
 *                       constrained to a `string` or `ReadonlySet<string>`,
 *                       that the {@link ArgString} contains.
 *
 * @see {@link operand-arg-string.OperandArgString}
 * @see {@link flag-arg-string.FlagArgString}
 * @see {@link option-arg-string.OptionArgString}
 * @see {@link ArgStringConstraint}
 * @see {@link ArgString}
 */
export abstract class ConstrainedArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #argStringConstraint: Readonly<ArgStringConstraint<PrefixType>>;
    readonly #argString: Readonly<ArgString<PrefixType>>;
    readonly #name: string;
    readonly #string: string;

    /**
     * Constructs a {@link ConstrainedArgString} object instance with the
     * provided {@link ArgStringConstraint}, {@link ArgString}, and `string`
     * name properties. If the passed {@link ArgString} argument violates one
     * the {@link ArgStringConstraint}'s constraints, then an error is thrown.
     *
     * This the root parent class the {@link operand-arg-string.OperandArgString},
     * {@link flag-arg-string.FlagArgString}, and {@link option-arg-string.OptionArgString}
     * classes inherit from.
     *
     * @param argStringConstraint The {@link ArgStringConstraint} the constructed
     *                            object will contain and enforces on its {@link ArgString}.
     *
     * @param argString The {@link ArgString} the constructed object will contain.
     *
     * @param name Name `string` value for the constructed object.
     *
     * @throws {@link ArgStringConstraintError}
     * if passed arg string constraint argument is `undefined` or `null`.
     *
     * @throws {@link ArgStringError}
     * if passed arg string argument is `undefined` or `null`.
     *
     * @throws {@link constraint-violation-error.PrefixConstraintViolationError}
     * if passed arg string {@link ArgString.prefix} fails validation.
     *
     * @throws {@link constraint-violation-error.ValueConstraintViolationError}
     * if passed arg string {@link ArgString.value} fails validation.
     *
     * @see {@link ArgStringConstraint}
     * @see {@link ArgString}
     */
    protected constructor( argStringConstraint: NonNullable<ArgStringConstraint<PrefixType>>,
                           argString: NonNullable<Readonly<ArgString<PrefixType>>>,
                           name: NonNullable<string> )
    {
        if (argStringConstraint === undefined || argStringConstraint === null)
        {
            throw new ArgStringConstraintError(`${new.target.name}: ${argStringConstraint} argument string constraint.`);
        }

        if (argString === undefined || argString === null)
        {
            throw new ArgStringError(`${new.target.name}: ${argString} argument string.`);
        }

        if ( ! argStringConstraint.isValidPrefix(argString.prefix))
        {
            throw new PrefixConstraintViolationError(`${new.target.name}: prefix string violates constraint: {prefix${typeof argString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argString.prefix)}, value: ${stringToString(argString.value)}}`);
        }

        if ( ! argStringConstraint.isValidValue(argString.prefix, argString.value))
        {
            throw new ValueConstraintViolationError(`${new.target.name}: value string violates constraint: {prefix${typeof argString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argString.prefix)}, value: ${stringToString(argString.value)}}`);
        }

        this.#argStringConstraint = Object.isFrozen(argStringConstraint) ? argStringConstraint : Object.freeze(createArgStringConstraint(argStringConstraint));
        this.#argString = argString;
        this.#name = name;
        this.#string = `${new.target.name} {${this.#name.length !== 0 && this.#name !== this.#argString.value ? `name: ${stringToString(this.#name)}, ` : ""}prefix: ${stringOrStringSetToString(this.#argString.prefix)}, value: ${stringOrStringSetToString(this.#argString.value)}}`;
    }

    /**
     * This object's {@link ArgStringConstraint} property.
     */
    public get argStringConstraint(): Readonly<ArgStringConstraint<PrefixType>> { return this.#argStringConstraint; }

    /**
     * This object's {@link ArgString} property.
     */
    public get argString(): Readonly<ArgString<PrefixType>> { return this.#argString; }

    /**
     * This object's `string` name property.
     */
    public get name(): string { return this.#name; }

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the `[inspect.custom]()` method.
     *
     * @returns a `string` representation of this object.
     */
    public toString(): string { return this.#string; }

    /**
     * Returns a `string` representation of this object. This is the same
     * `string` returned by the {@link ConstrainedArgString.toString} method.
     *
     * @returns a `string` representation of this object.
     */
    public [inspect.custom](): string { return this.#string; }
}

/**
 * Error thrown by the {@link ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the prefix constraint argument.
 */
export class ArgStringConstraintError extends Error
{
    public override readonly name: string = ArgStringConstraintError.name;

    /**
     * Constructs a new {@link ArgStringConstraintError} with the optional
     * `string` message.
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
export class ArgStringError extends Error
{
    public override readonly name: string = ArgStringError.name;

    /**
     * Constructs a new {@link ArgStringError} with the optional `string`
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

export default ConstrainedArgString;
