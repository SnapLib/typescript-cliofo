/**
 * This module contains the {@link ConstrainedArgString} abstract class which is
 * the root parent class the {@link operand-arg-string.OperandArgString},
 * {@link flag-arg-string.FlagArgString}, and {@link option-arg-string.OptionArgString}
 * classes inherit from.
 *
 * The {@link ConstrainedArgString} abstract class uses its {@link ArgStringConstraint}
 * {@link ConstrainedArgString.argStringConstraint} to enforce constraints on
 * its {@link ArgString} {@link ConstrainedArgString.argString} property. If a
 * {@link ConstrainedArgString} object attempts to be instantiated with an
 * {@link ArgString} that violates its {@link ConstrainedArgString.argStringConstraint},
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
import { inspect } from "util";
import { PrefixConstraintViolationError, ValueConstraintViolationError } from "./error/constraint-violation-error.js";
import { ArgStringConstraintError, ArgStringError } from "./error/constrained-arg-string-error.js";

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
 * This class is ues to create objects that enforce constraints on the
 * {@link ArgString.prefix} and {@link ArgString.value} properties of
 * {@link ArgString} objects.
 */
export abstract class ConstrainedArgString<PrefixType extends StringOrReadonlyStringSet>
{
    readonly #argStringConstraint: Readonly<ArgStringConstraint<PrefixType>>;
    readonly #argString: Readonly<ArgString<PrefixType>>;
    readonly #name: string;
    readonly #string: string;

    protected constructor(argStringConstraint: NonNullable<ArgStringConstraint<PrefixType>>, argString: NonNullable<Readonly<ArgString<PrefixType>>>, name: NonNullable<string>)
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

    public get argConstraint(): Readonly<ArgStringConstraint<PrefixType>> { return this.#argStringConstraint; }
    public get argString(): Readonly<ArgString<PrefixType>> { return this.#argString; }
    public get name(): string { return this.#name; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export default ConstrainedArgString;
