/**
 * This module contains the {@link PrefixConstraintError} and {@link ValueConstraintError}
 * errors thrown by the {@link arg-string-constraint.ArgStringConstraint} class
 * constructor if `undefined` or `null` is passed as an argument.
 *
 * @module arg-string-constraint-error
 */

/**
 * Error thrown by the {@link arg-string-constraint.ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the prefix constraint argument.
 */
export class PrefixConstraintError extends Error
{
    public override readonly name: string = PrefixConstraintError.name;

    /**
     * Constructs a new {@link PrefixConstraintError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * Error thrown by the {@link arg-string-constraint.ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the value constraint argument.
 */
export class ValueConstraintError extends Error
{
    public override readonly name: string = ValueConstraintError.name;

    /**
     * Constructs a new {@link ValueConstraintError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
