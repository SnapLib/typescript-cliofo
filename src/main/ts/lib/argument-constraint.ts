import { PrefixConstraintViolationError } from "./prefix-constraint-violation-error.js";
import { ValueConstraintViolationError } from "./value-constraint-violation-error.js";

const ALWAYS_TRUE_STRING_PREDICATE: (aString: string) => true = Object.freeze(() => true);

export type stringPredicate = (prefixString: string) => boolean;

export type biStringPredicate = (prefixString: string, valueString: string) => boolean;

export class ArgumentConstraint
{
    readonly #prefixConstraint: stringPredicate;
    readonly #valueConstraint: biStringPredicate;

    public constructor( prefixConstraint: NonNullable<stringPredicate>,
                        valueConstraint: NonNullable<biStringPredicate> );
    public constructor( other: NonNullable<ArgumentConstraint>);
    constructor( prefixOrOther: NonNullable<stringPredicate | ArgumentConstraint>,
                 valueConstraint?: NonNullable<biStringPredicate> )
    {
        if (prefixOrOther instanceof ArgumentConstraint)
        {
            this.#prefixConstraint = prefixOrOther.#prefixConstraint;
            this.#valueConstraint = prefixOrOther.#valueConstraint;
        }
        else
        {
            if (valueConstraint)
            {
                this.#prefixConstraint = Object.isFrozen(prefixOrOther) ? prefixOrOther : Object.freeze((prefixString: string) => prefixOrOther(prefixString));
                this.#valueConstraint = Object.isFrozen(valueConstraint) ? valueConstraint : Object.freeze((prefixString: string, valueString: string) => valueConstraint(prefixString, valueString));
            }
            else
            {
                throw new TypeError(`${ArgumentConstraint.name} constructor undefined or null value constraint`);
            }
        }
    }

    public get prefixConstraint(): stringPredicate { return this.#prefixConstraint; }
    public get valueConstraint(): biStringPredicate { return this.#valueConstraint; }

    public isValidPrefix(prefixString: string): boolean { return this.#prefixConstraint(prefixString); }
    public isValidValue(prefixString: string, valueString: string): boolean { return this.#valueConstraint(prefixString, valueString); }

    public requireValidPrefix(prefixString: string, message?: string): string
    {
        if(this.#prefixConstraint(prefixString))
        {
            return prefixString;
        }

        throw new PrefixConstraintViolationError(message);
    }

    public requireValidValue(prefixString: string, valueString: string, message?: string): string
    {
        if(this.#valueConstraint(prefixString, valueString))
        {
            return valueString;
        }

        throw new ValueConstraintViolationError(message);
    }

    public equals(obj: unknown): boolean
    {
        return obj instanceof ArgumentConstraint
            && this.#prefixConstraint === obj.#prefixConstraint
            && this.#valueConstraint === obj.#valueConstraint;
    }
}

export function argumentConstraint(prefixString?: stringPredicate, value?: biStringPredicate ) : ArgumentConstraint;
export function argumentConstraint(other: ArgumentConstraint ): ArgumentConstraint;
export function argumentConstraint(
    prefixOrOther?: stringPredicate | ArgumentConstraint,
    value?: biStringPredicate
): ArgumentConstraint
{
    if (prefixOrOther instanceof ArgumentConstraint)
    {
        return new ArgumentConstraint(prefixOrOther);
    }
    else
    {
        return new ArgumentConstraint( prefixOrOther ?? ALWAYS_TRUE_STRING_PREDICATE,
                                       value ?? ALWAYS_TRUE_STRING_PREDICATE );
    }
}

export {argumentConstraint as default};
