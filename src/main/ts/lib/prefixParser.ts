class OperandsFlagsOptions
{
    protected readonly _strings: readonly string[];
    protected readonly _operands: readonly string[];
    protected readonly _flags: readonly string[];
    protected readonly _options: readonly string[];

    constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this._strings = Object.freeze([...operands, ...flags, ...options]);
        this._operands = operands;
        this._flags = flags;
        this._options = options;
    }

    public strings(): readonly string[] {return this._strings;}
    public operands(): readonly string[] {return this._operands;}
    public flags(): readonly string[] {return this._flags;}
    public options(): readonly string[] {return this._options;}
}


export class CliArgPrefixParser extends OperandsFlagsOptions
{
    private readonly _prefixChar: string;
    private readonly _distinct: OperandsFlagsOptions;


    public constructor(prefixChar: string, strings: readonly string[])
    {
        if (prefixChar.length === 0)
        {
            super(strings, [], []);

            this._distinct = new OperandsFlagsOptions( Object.freeze([]),
                                                       Object.freeze([]),
                                                       Object.freeze([]) );
        }
        else
        {
            const optionPrefix: string = prefixChar.repeat(2);

            const operandsFlagsOptions: { readonly operands: string[],
                                        readonly flags: string[],
                                        readonly options: string[] }
                = strings.reduce((operandFlagOptionsTuple: {readonly operands: string[], readonly options: string[], readonly flags: string[]}, aString: string) =>
                {
                    // If no prefix char, save entire string to index
                    if ( ! aString.startsWith(prefixChar))
                    {
                        operandFlagOptionsTuple.operands.push(aString);
                    }
                    // If starts with 2 or more adjacent prefix chars, save string
                    // without leading 2 prefix chars
                    else if (aString.startsWith(optionPrefix))
                    {
                        operandFlagOptionsTuple.options.push(aString.slice(optionPrefix.length));
                    }
                    // If starts with only a single prefix char, save characters of
                    // string without leading prefix char
                    else
                    {
                        for(const flagChar of aString.slice(prefixChar.length))
                        {
                            operandFlagOptionsTuple.flags.push(flagChar);
                        }
                    }
                    return operandFlagOptionsTuple;
                },
                Object.freeze({operands: [], flags: [],options: []}));

            super( Object.freeze(operandsFlagsOptions.operands),
                   Object.freeze(operandsFlagsOptions.flags),
                   Object.freeze(operandsFlagsOptions.options) );

            this._distinct = new OperandsFlagsOptions(
                Object.freeze([...new Set(this._operands)]),
                Object.freeze([...new Set(this._flags)]),
                Object.freeze([...new Set(this._options)])
            );
        }

        this._prefixChar = prefixChar;

    }

    public prefixChar(): string {return this._prefixChar;}

    public strings(): readonly string[] {return this._strings;}

    public operands(): readonly string[] {return this._operands;}

    public options(): readonly string[] {return this._options;}

    public flags(): readonly string[] {return this._flags;}

    public isEmpty(): boolean {return this._strings.length === 0;}

    public distinct(): OperandsFlagsOptions {return this._distinct;}

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
