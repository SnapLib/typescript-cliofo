interface OperandsOptionsFlags
{
    operands(): readonly string[];
    flags(): readonly string[];
    options(): readonly string[];
}


export class CliArgPrefixParser
{
    private readonly _prefixChar: string;
    private readonly _strings: readonly string[];
    private readonly _operands: readonly string[];
    private readonly _options: readonly string[];
    private readonly _flags: readonly string[];
    private readonly _distinct: OperandsOptionsFlags;


    public constructor(prefixChar: string, strings: readonly string[])
    {
        this._prefixChar = prefixChar;
        this._strings = strings;

        const optionPrefix: string = prefixChar.repeat(2);

        const operandsFlagsOptions: { readonly operands: string[],
                                      readonly flags: string[],
                                      readonly options: string[]}
            = strings.reduce((operandFlagOptionsTuple: {readonly operands: string[], readonly options: string[], readonly flags: string[]}, aString: string) =>
            {
                // If no prefix char, save entire string to index
                if ( ! aString.startsWith(prefixChar))
                {
                    operandFlagOptionsTuple.operands.push(aString);
                }
                // If starts with 2 or more prefix chars, save string without
                // leading 2 prefix chars
                else if (aString.startsWith(optionPrefix))
                {
                    operandFlagOptionsTuple.options.push(aString.slice(2));
                }
                // If starts with only a single prefix char, save characters of
                // string without leading prefix char
                else
                {
                    for(const flagChar of aString.slice(1))
                    {
                        operandFlagOptionsTuple.flags.push(flagChar);
                    }
                }
                return operandFlagOptionsTuple;
            },
            Object.freeze({operands: [], flags: [],options: []}));

        this._operands = Object.freeze(operandsFlagsOptions.operands);
        this._flags = Object.freeze(operandsFlagsOptions.flags);
        this._options = Object.freeze(operandsFlagsOptions.options);

        const distinctOperands: readonly string[] = Object.freeze([...new Set(operandsFlagsOptions.operands)]);
        const distinctFlags: readonly string[] = Object.freeze([...new Set(operandsFlagsOptions.flags)]);
        const distinctOptions: readonly string[] = Object.freeze([...new Set(operandsFlagsOptions.options)]);

        this._distinct = Object.freeze({
            operands() { return distinctOperands; },
            flags() { return distinctFlags; },
            options() { return distinctOptions; }
        });
    }

    public prefixChar(): string {return this._prefixChar;}

    public strings(): readonly string[] {return this._strings;}

    public operands(): readonly string[] {return this._operands;}

    public options(): readonly string[] {return this._options;}

    public flags(): readonly string[] {return this._flags;}

    public isEmpty(): boolean {return this._strings.length === 0;}

    public distinct(): OperandsOptionsFlags {return this._distinct;}

    public toString(): string
    {
        const str: string =   `prefixChar: "${this._prefixChar}", `
                            + `operands: ${joinStrings(this._operands)}, `
                            + `flags: ${joinStrings(this._flags)}, `
                            + `options: ${joinStrings(this._options)}`;
        return `${this.constructor.name}{${str}}`;
    }
}

const joinStrings = (strings: readonly string[]): string =>
{
    const quotes: string = strings.length !== 0 ? "\"" : "";
    return `[${quotes}${strings.join("\", \"")}${quotes}]`;
};
