import { type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { type ArgumentString, argumentString as argString } from "./argument-string.js";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export abstract class ConstrainedArgumentString
{
    readonly #argConstraint: Readonly<ArgumentConstraint>;
    readonly #argString: Readonly<ArgumentString>;
    readonly #string: string;

    protected constructor(other: NonNullable<ConstrainedArgumentString>);
    protected constructor(argumentConstraint: NonNullable<ArgumentConstraint>, argumentString: NonNullable<ArgumentString>);
    protected constructor(argumentConstraintOrOther: NonNullable<ArgumentConstraint | ConstrainedArgumentString>, argumentString?: NonNullable<ArgumentString>)
    {
        if (argumentConstraintOrOther instanceof ConstrainedArgumentString)
        {
            this.#argConstraint = argumentConstraintOrOther.#argConstraint;
            this.#argString = argumentConstraintOrOther.#argString;
        }
        else
        {

            if (argumentString === undefined || argumentString === null)
            {
                throw new TypeError(`${this.constructor.name}: undefined or null argument string`);
            }

            if ( ! argumentConstraintOrOther.isValidPrefix(argumentString.prefix))
            {
                throw new Error(`${this.constructor.name}: prefix string violates constraint: "${argumentString.prefix}"`);
            }

            if ( ! argumentConstraintOrOther.isValidValue(argumentString.prefix, argumentString.value))
            {
                throw new Error(`${this.constructor.name}: value string violates constraint: "${argumentString.prefix}"`);
            }

            this.#argConstraint = Object.isFrozen(argumentConstraintOrOther) ? argumentConstraintOrOther : Object.freeze(argumentConstraint(argumentConstraintOrOther));
            this.#argString = Object.isFrozen(argumentString) ? argumentString : Object.freeze(argString(argumentString));
        }

        this.#string = `${this.constructor.name} {prefix: ${stringToString(this.#argString.prefix)}, value: ${stringToString(this.#argString.value)}}`;
    }

    public get argConstraint(): Readonly<ArgumentConstraint> { return this.#argConstraint; }
    public get argString(): Readonly<ArgumentString> { return this.#argString; }

    public equals(obj: unknown): boolean
    {
        return this === obj || obj instanceof ConstrainedArgumentString
               && this.#argConstraint.equals(obj.#argConstraint)
               && this.#argString.equals(obj.#argString);
    }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export {ConstrainedArgumentString as default};
