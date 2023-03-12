export class ConsumerRangeError extends RangeError
{
    public constructor(message: string)
    {
        super(message);
    }
}

export {ConsumerRangeError as default};
