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

export class OperandString extends ConstrainedArgumentString
{
    public constructor( argumentString: ArgumentString );
    public constructor( undefinedOperand: OperandString );
    constructor( argumentStringOrUndefinedOperand: ArgumentString | OperandString )
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

    public is(aString: string): boolean
    {
        return ! aString.startsWith(this.argString.prefix) && this.argString.value === aString;
    }
}

export function operandString(prefixString: string, valueString: string): OperandString;
export function operandString(prefixCodePoint: number, valueString: string): OperandString;
export function operandString(argumentString: ArgumentString): OperandString;
export function operandString(undefinedOperand: OperandString): OperandString;
export function operandString(stringNumberArgumentStringOrUndefinedOperand: string | number | ArgumentString | OperandString, valueString?: string): OperandString
{
    if (typeof stringNumberArgumentStringOrUndefinedOperand === "string")
    {
        return new OperandString(argumentString(stringNumberArgumentStringOrUndefinedOperand, valueString));
    }

    if (typeof stringNumberArgumentStringOrUndefinedOperand === "number")
    {
        if ( ! Number.isInteger(stringNumberArgumentStringOrUndefinedOperand))
        {
            throw new PrefixConstraintViolationError(`passed number value is not an integer: ${stringNumberArgumentStringOrUndefinedOperand}`);
        }

        return new OperandString(argumentString(String.fromCodePoint(stringNumberArgumentStringOrUndefinedOperand), valueString));
    }

    if (stringNumberArgumentStringOrUndefinedOperand instanceof ArgumentString)
    {
        return new OperandString(stringNumberArgumentStringOrUndefinedOperand);
    }

    return new OperandString(stringNumberArgumentStringOrUndefinedOperand);
}

export {operandString as default};
