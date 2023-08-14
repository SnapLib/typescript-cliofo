/**
 * This module contains the {@link PrefixConstraintViolationError} and
 * {@link ValueConstraintViolationError} errors thrown by the
 * {@link arg-string-constraint.ArgStringConstraint} and
 * {@link constrained-arg-string.ConstrainedArgString} if validation for either
 * a prefix or value fails.
 *
 * @module constraint-violation-error
 */

/**
 * Error thrown by {@link arg-string-constraint.ArgStringConstraint.requireValidPrefix ArgStringConstraint.prototype.requireValidPrefix(prefix,string?)}
 * method and the {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString constructor}
 * if a `prefix` fails validation.
 */
export class PrefixConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, PrefixConstraintViolationError.prototype);
    }
}

/**
 * Error thrown by {@link arg-string-constraint.ArgStringConstraint.requireValidValue ArgStringConstraint.prototype.requireValidValue(prefix,string,string?)}
 * method and the {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString constructor}
 * if a `string` value fails validation.
 */
export class ValueConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ValueConstraintViolationError.prototype);
    }
}
