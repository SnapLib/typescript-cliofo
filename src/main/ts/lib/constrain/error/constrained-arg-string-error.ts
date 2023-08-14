/**
 * This module contains the {@link ArgStringConstraintError} and {@link ArgStringError}
 * errors thrown by the {@link constrained-arg-string.ConstrainedArgString} class
 * constructor if `undefined` or `null` is passed as an argument.
 *
 * @module constrained-arg-string-error
 */

/**
 * Error thrown by the {@link arg-string-constraint.ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the prefix constraint argument.
 */
export class ArgStringConstraintError extends Error
{
    public override readonly name: string = ArgStringConstraintError.name;

    /**
     * Constructs a new {@link ArgStringConstraintError} with the optional
     * `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringConstraintError.prototype);
    }
}

/**
 * Error thrown by the {@link arg-string-constraint.ArgStringConstraint.constructor ArgStringConstraint constructor}
 * if `undefined` or `null` is passed an argument for the value constraint argument.
 */
export class ArgStringError extends Error
{
    public override readonly name: string = ArgStringError.name;

    /**
     * Constructs a new {@link ArgStringError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringError.prototype);
    }
}
