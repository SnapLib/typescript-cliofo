/**
 * @module constrained-arg-string
 */

import { type ArgStringConstraint, argStringConstraint as createArgStringConstraint } from "./arg-string-constraint.js";
import { type ArgString, type StringOrReadonlyStringSet } from "./../string/arg-string.js";
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
            throw new ArgStringConstraintError(`${ConstrainedArgString.name}: ${argStringConstraint} argument string constraint.`);
        }

        if (argString === undefined || argString === null)
        {
            throw new ArgStringError(`${ConstrainedArgString.name}: ${argString} argument string.`);
        }

        if ( ! argStringConstraint.isValidPrefix(argString.prefix))
        {
            throw new PrefixConstraintViolationError(`${ConstrainedArgString.name}: prefix string violates constraint: {prefix${typeof argString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argString.prefix)}, value: ${stringToString(argString.value)}}`);
        }

        if ( ! argStringConstraint.isValidValue(argString.prefix, argString.value))
        {
            throw new ValueConstraintViolationError(`${ConstrainedArgString.name}: value string violates constraint: {prefix${typeof argString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argString.prefix)}, value: ${stringToString(argString.value)}}`);
        }

        this.#argStringConstraint = Object.isFrozen(argStringConstraint) ? argStringConstraint : Object.freeze(createArgStringConstraint(argStringConstraint));
        this.#argString = argString;
        this.#name = name;
        this.#string = `${ConstrainedArgString.name} {${this.#name.length !== 0 && this.#name !== this.#argString.value ? `name: ${stringToString(this.#name)}, ` : ""}prefix: ${stringOrStringSetToString(this.#argString.prefix)}, value: ${stringOrStringSetToString(this.#argString.value)}}`;
    }

    public get argConstraint(): Readonly<ArgStringConstraint<PrefixType>> { return this.#argStringConstraint; }
    public get argString(): Readonly<ArgString<PrefixType>> { return this.#argString; }
    public get name(): string { return this.#name; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export {ConstrainedArgString as default};
