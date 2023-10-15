/**
 * This module contains the {@link PrefixConstraintViolationError} and {@link ValueConstraintViolationError} error
 * classes thrown by the {@link arg-string-constraint.ArgStringConstraint} and
 * {@link constrained-arg-string.ConstrainedArgString} classes if validation for either a prefix or value fails.
 *
 * @module constraint-violation-error
 *
 * @see {@link arg-string-constraint}
 * @see {@link constrained-arg-string}
 */

/**
 * Error thrown by {@link arg-string-constraint.ArgStringConstraint.requireValidPrefix ArgStringConstraint.prototype.requireValidPrefix(prefix,string?)}
 * method and the {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString constructor}
 * if a `prefix` fails validation.
 *
 * @see {@link arg-string-constraint.ArgStringConstraint.requireValidPrefix ArgStringConstraint.prototype.requireValidPrefix}
 * @see {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString() constructor}
 */
export class PrefixConstraintViolationError extends Error
{
    /** The name for the type of error. */
    public override readonly name: string = PrefixConstraintViolationError.name;

    /**
     * Constructs a new {@link PrefixConstraintViolationError} with the optional `string` message.
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
 * Error thrown by {@link arg-string-constraint.ArgStringConstraint.requireValidValue ArgStringConstraint.prototype.requireValidValue(prefix,string,string?)}
 * method and the {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString constructor} if a `string` value fails validation.
 *
 * @see {@link arg-string-constraint.ArgStringConstraint.requireValidValue ArgStringConstraint.prototype.requireValidValue}
 * @see {@link constrained-arg-string.ConstrainedArgString.constructor ConstrainedArgString() constructor}
 */
export class ValueConstraintViolationError extends Error
{
    /** The name for the type of error. */
    public override readonly name: string = ValueConstraintViolationError.name;

    /**
     * Constructs a new {@link ValueConstraintViolationError} with the optional `string` message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
