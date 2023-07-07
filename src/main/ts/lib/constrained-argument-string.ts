import { ArgumentConstraint } from "./argument-constraint.js";
import { ArgumentString } from "./argument-string.js";

export abstract class ConstrainedArgument
{
    readonly #argConstraint: Readonly<ArgumentConstraint>;
    readonly #argString: Readonly<ArgumentString>;

    protected constructor(argumentConstraint: NonNullable<ArgumentConstraint>, argumentString: NonNullable<ArgumentString>)
    {
        if ( ! argumentConstraint.isValidPrefix(argumentString.prefixString))
        {
            throw new Error(`${ConstrainedArgument.name}: prefix string violates constraint: "${argumentString.prefixString}"`);
        }

        if ( ! argumentConstraint.isValidValue(argumentString.prefixString, argumentString.valueString))
        {
            throw new Error(`${ConstrainedArgument.name}: value string violates constraint: "${argumentString.prefixString}"`);
        }

        this.#argConstraint = Object.isFrozen(argumentConstraint) ? argumentConstraint : Object.freeze(new ArgumentConstraint(argumentConstraint));
        this.#argString = Object.isFrozen(argumentString) ? argumentString : Object.freeze(new ArgumentString(argumentString));
    }

    public get argConstraint(): Readonly<ArgumentConstraint> { return this.#argConstraint; }
    public get argString(): Readonly<ArgumentString> { return this.#argString; }

    public equals(obj: unknown): boolean
    {
        return obj instanceof ConstrainedArgument
               && this.#argConstraint.equals(obj.#argConstraint)
               && this.#argString.equals(obj.#argString);
    }
}

export {ConstrainedArgument as default};
