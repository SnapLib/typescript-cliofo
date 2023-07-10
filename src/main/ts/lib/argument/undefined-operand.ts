import { type stringPredicate, type biStringPredicate, type ArgumentConstraint, argumentConstraint } from "./argument-constraint.js";
import { ArgumentString, argumentString } from "./argument-string.js";
import { PrefixConstraintViolationError } from "./error/prefix-constraint-violation-error.js";
import { ConstrainedArgumentString } from "./constrained-argument-string.js";

export const operandPrefixPredicate: stringPredicate =
    Object.freeze( (operandPrefixString: string) =>
           operandPrefixString !== undefined
        && operandPrefixString !== null
        && operandPrefixString.length > 0 );

/**
 * Predicate that consumes 2 `string`s and returns `true` if the second `string`
 * argument is empty or doesn't start with the first `string` argument.
 *
 * This is used to validate the values (the part that comes after the prefix)
 * for operands.
 *
 * @param prefixString The prefix `string` used to validate the operand value.
 *
 * @param operandValueString The operand value `string` being validated.
 *
 * @returns `true` if the passed operand `string` value is empty or doesn't
 *          start with the prefix `string`.
 */
export const operandValuePredicate: biStringPredicate =
    Object.freeze( (prefixString: string, operandValueString: string) =>
        operandValueString.length === 0 || operandValueString.slice(0, prefixString.length) !== prefixString
    );

export const optionArgumentConstraint: ArgumentConstraint = argumentConstraint(operandPrefixPredicate, operandValuePredicate);

export class UndefinedOperand extends ConstrainedArgumentString
{
    public constructor( argumentString: ArgumentString );
    public constructor( undefinedOperand: UndefinedOperand );
    constructor( argumentStringOrUndefinedOperand: ArgumentString | UndefinedOperand )
    {
        if (argumentStringOrUndefinedOperand instanceof ArgumentString)
        {
            super(optionArgumentConstraint, argumentStringOrUndefinedOperand);
        }
        else
        {
            super(argumentStringOrUndefinedOperand);
        }
    }
}

export function undefinedOperand(prefixString: string, valueString: string): UndefinedOperand;
export function undefinedOperand(prefixCodePoint: number, valueString: string): UndefinedOperand;
export function undefinedOperand(argumentString: ArgumentString): UndefinedOperand;
export function undefinedOperand(undefinedOperand: UndefinedOperand): UndefinedOperand;
export function undefinedOperand(stringNumberArgumentStringOrUndefinedOperand: string | number | ArgumentString | UndefinedOperand, valueString?: string): UndefinedOperand
{
    if (typeof stringNumberArgumentStringOrUndefinedOperand === "string")
    {
        return new UndefinedOperand(argumentString(stringNumberArgumentStringOrUndefinedOperand, valueString));
    }

    if (typeof stringNumberArgumentStringOrUndefinedOperand === "number")
    {
        if ( ! Number.isInteger(stringNumberArgumentStringOrUndefinedOperand))
        {
            throw new PrefixConstraintViolationError(`passed number value is not an integer: ${stringNumberArgumentStringOrUndefinedOperand}`);
        }

        return new UndefinedOperand(argumentString(String.fromCodePoint(stringNumberArgumentStringOrUndefinedOperand), valueString));
    }

    if (stringNumberArgumentStringOrUndefinedOperand instanceof ArgumentString)
    {
        return new UndefinedOperand(stringNumberArgumentStringOrUndefinedOperand);
    }

    return new UndefinedOperand(stringNumberArgumentStringOrUndefinedOperand);
}

export {undefinedOperand as default};
