/**
 * This module contains the errors thrown by the {@link arg-string.ArgString}
 * class constructor if `undefined` or `null` is passed as an argument.
 *
 * @module arg-string-error
 */

export class ArgStringPrefixError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringPrefixError.prototype);
    }
}

export class ArgStringValueError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringValueError.prototype);
    }
}
