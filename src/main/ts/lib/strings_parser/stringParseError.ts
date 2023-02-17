export class StringParseError extends Error
{
    public readonly argString?: string;
    public constructor(message: string, argString?: string)
    {
        super(message);
        this.argString = argString;
    }
}
