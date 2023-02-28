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

/**
 * Class containing static methods used to check if the given prefix string and
 * string argument combo are an operand, flag, or option. These methods are used
 * in the {@link CliofoStrings} and {@link CliofoIndexes} classes.
 */
export abstract class Util
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
