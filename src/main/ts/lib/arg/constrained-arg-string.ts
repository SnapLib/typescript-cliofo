import { type ArgStringConstraint, argStringConstraint as createArgStringConstraint } from "./arg-string-constraint.js";
import { type ArgString, type StringOrStringSet } from "./arg-string.js";
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

export abstract class ConstrainedArgString<PrefixType extends StringOrStringSet>
{
    readonly #argStringConstraint: Readonly<ArgStringConstraint<PrefixType>>;
    readonly #argString: Readonly<ArgString<PrefixType>>;
    readonly #string: string;

    protected constructor(argumentStringConstraint: NonNullable<ArgStringConstraint<PrefixType>>, argumentString: NonNullable<ArgString<PrefixType>>)
    {
        if (argumentStringConstraint === undefined || argumentStringConstraint === null)
        {
            throw new TypeError(`${ConstrainedArgString.name}: ${argumentStringConstraint} argument string constraint.`);
        }

        if (argumentString === undefined || argumentString === null)
        {
            throw new TypeError(`${ConstrainedArgString.name}: ${argumentString} argument string.`);
        }

        if ( ! argumentStringConstraint.isValidPrefix(argumentString.prefix))
        {
            throw new Error(`${ConstrainedArgString.name}: prefix string violates constraint: {prefix${typeof argumentString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argumentString.prefix)}, value: ${stringToString(argumentString.value)}}`);
        }

        if ( ! argumentStringConstraint.isValidValue(argumentString.prefix, argumentString.value))
        {
            throw new Error(`${ConstrainedArgString.name}: value string violates constraint: {prefix${typeof argumentString.prefix === "string" ? "" : "es"}: ${stringOrStringSetToString(argumentString.prefix)}, value: ${stringToString(argumentString.value)}}`);
        }

        this.#argStringConstraint = Object.isFrozen(argumentStringConstraint) ? argumentStringConstraint : Object.freeze(createArgStringConstraint(argumentStringConstraint));
        this.#argString = argumentString;

        this.#string = `${ConstrainedArgString.name} {prefix: ${stringOrStringSetToString(this.#argString.prefix)}, value: ${stringOrStringSetToString(this.#argString.value)}}`;
    }

    public get argConstraint(): Readonly<ArgStringConstraint<PrefixType>> { return this.#argStringConstraint; }
    public get argString(): Readonly<ArgString<PrefixType>> { return this.#argString; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export {ConstrainedArgString as default};
