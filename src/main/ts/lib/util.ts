export function isOperand(prefixString: string, aString: string): boolean
{
    return prefixString.length === 0 || ! aString.startsWith(prefixString);
}

export function isFlag(prefixString: string, aString: string): boolean
{
    return prefixString.length !== 0 || (aString.startsWith(prefixString) && ! aString.startsWith(prefixString.repeat(2)));
}

export function isOption(prefixString: string, aString: string): boolean
{
    return prefixString.length !== 0 && aString.startsWith(prefixString.repeat(2));
}

export class Util
{
    public static isOperand(prefixString: string, aString: string): boolean
    {
        return isOperand(prefixString, aString);
    }

    public static isFlag(prefixString: string, aString: string): boolean
    {
        return isFlag(prefixString, aString);
    }

    public static isOption(prefixString: string, aString: string): boolean
    {
        return isOption(prefixString, aString);
    }
}

export {Util as default};
