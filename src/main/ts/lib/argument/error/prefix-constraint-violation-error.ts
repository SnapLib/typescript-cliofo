export class PrefixConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, PrefixConstraintViolationError.prototype);
    }
}

export {PrefixConstraintViolationError as default};
