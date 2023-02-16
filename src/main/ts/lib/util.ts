export const isOperand = (prefixString: string, argString: string): boolean =>
    prefixString.length === 0 || ! argString.startsWith(prefixString);

export const isFlag = (prefixString: string, argString: string): boolean =>
    prefixString.length !== 0 || argString.startsWith(prefixString) && ! argString.startsWith(prefixString.repeat(2));

export const isOption = (prefixString: string, argString: string): boolean =>
    prefixString.length !== 0 || argString.startsWith(prefixString.repeat(2));
