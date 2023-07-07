export class ValueConstraintViolationError extends Error
{
    public constructor(message?: string)
    {
        super(message);
        Object.setPrototypeOf(this, ValueConstraintViolationError.prototype);
    }
}

export {ValueConstraintViolationError as default};
