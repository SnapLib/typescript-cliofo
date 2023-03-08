export class ParseError extends Error
{
    public readonly argString?: string;
    public constructor(message: string)
    {
        super(message);
    }
}
