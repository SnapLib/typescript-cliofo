import { ArgumentConstraint } from "./argument-constraint.js";
import { ArgumentString } from "./argument-string.js";

export abstract class ConstrainedArgumentString
{
    readonly #argConstraint: Readonly<ArgumentConstraint>;
    readonly #argString: Readonly<ArgumentString>;

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
                throw new TypeError(`${ConstrainedArgumentString.name}: undefined or null argument string`);
            }

            if ( ! argumentConstraintOrOther.isValidPrefix(argumentString.prefixString))
            {
                throw new Error(`${ConstrainedArgumentString.name}: prefix string violates constraint: "${argumentString.prefixString}"`);
            }

            if ( ! argumentConstraintOrOther.isValidValue(argumentString.prefixString, argumentString.valueString))
            {
                throw new Error(`${ConstrainedArgumentString.name}: value string violates constraint: "${argumentString.prefixString}"`);
            }

            this.#argConstraint = Object.isFrozen(argumentConstraintOrOther) ? argumentConstraintOrOther : Object.freeze(new ArgumentConstraint(argumentConstraintOrOther));
            this.#argString = Object.isFrozen(argumentString) ? argumentString : Object.freeze(new ArgumentString(argumentString));
    }
    }

    public get argConstraint(): Readonly<ArgumentConstraint> { return this.#argConstraint; }
    public get argString(): Readonly<ArgumentString> { return this.#argString; }

    public equals(obj: unknown): boolean
    {
        return obj instanceof ConstrainedArgumentString
               && this.#argConstraint.equals(obj.#argConstraint)
               && this.#argString.equals(obj.#argString);
    }
}

export {ConstrainedArgumentString as default};
