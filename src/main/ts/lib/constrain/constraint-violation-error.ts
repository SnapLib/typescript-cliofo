/**
 * This module contains the {@link PrefixConstraintViolationError} and
 * {@link ValueConstraintViolationError} errors thrown by the
 * {@link arg-string-constraint.ArgStringConstraint} and
 * {@link constrained-arg-string.ConstrainedArgString} if validation for either
 * a prefix or value fails.
 *
 * @module constraint-violation-error
 */

export class PrefixConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, PrefixConstraintViolationError.prototype);
    }
}

export class ValueConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ValueConstraintViolationError.prototype);
    }
}
