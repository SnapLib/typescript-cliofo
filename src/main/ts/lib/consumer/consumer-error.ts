export class ConsumerError extends Error
{
    public constructor(message: string)
    {
        super(message);
    }
}

export {ConsumerError as default};
