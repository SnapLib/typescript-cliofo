/**
 * This module contains the {@link ArgStringPrefixError} and
 * {@link ArgStringValueError} errors thrown by the {@link arg-string.ArgString}
 * class constructor if `undefined` or `null` is passed as an argument.
 *
 * @module arg-string-error
 */

/**
 * Error thrown by the {@link arg-string.ArgString.constructor ArgString constructor}
 * if `undefined` or `null` is passed as an argument for the `prefix` argument.
 */
export class ArgStringPrefixError extends Error
{
    public override readonly name: string = ArgStringPrefixError.name;

    /**
     * Constructs a new {@link ArgStringPrefixError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringPrefixError.prototype);
    }
}

/**
 * Error thrown by the {@link arg-string.ArgString.constructor ArgString constructor} if
 * `undefined` or `null` is passed as an argument for the `value` argument.
 */
export class ArgStringValueError extends Error
{
    public override readonly name: string = ArgStringValueError.name;

    /**
     * Constructs a new {@link ArgStringValueError} with the optional `string`
     * message.
     *
     * @param message The error message.
     */
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ArgStringValueError.prototype);
    }
}
