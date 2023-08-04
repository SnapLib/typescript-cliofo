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

    protected constructor(argStringConstraint: NonNullable<ArgStringConstraint<PrefixType>>, argumentString: NonNullable<ArgString<PrefixType>>)
    {
        if (argStringConstraint instanceof ConstrainedArgString)
        {
            this.#argStringConstraint = argStringConstraint.#argStringConstraint;
            this.#argString = argStringConstraint.#argString;
        }
        else
        {

            if (argumentString === undefined || argumentString === null)
            {
                throw new TypeError(`${this.constructor.name}: undefined or null argument string`);
            }

            if ( ! argStringConstraint.isValidPrefix(argumentString.prefix))
            {
                throw new Error(`${this.constructor.name}: prefix string violates constraint: "${argumentString.prefix}"`);
            }

            if ( ! argStringConstraint.isValidValue(argumentString.prefix, argumentString.value))
            {
                throw new Error(`${this.constructor.name}: value string violates constraint: "${argumentString.prefix}"`);
            }

            this.#argStringConstraint = Object.isFrozen(argStringConstraint) ? argStringConstraint : Object.freeze(createArgStringConstraint(argStringConstraint));
            this.#argString = argumentString;
        }

        this.#string = `${this.constructor.name} {prefix: ${stringOrStringSetToString(this.#argString.prefix)}, value: ${stringOrStringSetToString(this.#argString.value)}}`;
    }

    public get argConstraint(): Readonly<ArgStringConstraint<PrefixType>> { return this.#argStringConstraint; }
    public get argString(): Readonly<ArgString<PrefixType>> { return this.#argString; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export {ConstrainedArgString as default};
