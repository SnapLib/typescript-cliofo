import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";
import {joinStringsFormatted} from "./util.js";

export class CliArgPrefixParser extends OperandsFlagsOptions
{
    private readonly _prefixChar: string;
    private readonly _strings: readonly string[];
    private readonly _distinct: Readonly<OperandsFlagsOptions>;


    public constructor(prefixChar: string, strings: readonly string[])
    {
            const optionPrefix: string = prefixChar.repeat(2);

            const operandsFlagsOptions: Readonly<{ readonly operands: string[],
                                                   readonly flags: string[],
                                                   readonly options: string[] }>
                = strings.reduce((
                    operandFlagOptionsTuple: Readonly<{ readonly operands: string[],
                                                        readonly options: string[],
                                                        readonly flags: string[] }>,
                    aString: string) =>
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
            this._prefixChar = prefixChar;
            this._strings = strings;
            this._distinct = Object.freeze(new OperandsFlagsOptions(
                Object.freeze([...new Set(this._operands)]),
                Object.freeze([...new Set(this._flags)]),
                Object.freeze([...new Set(this._options)])
            ));
    }

    public prefixChar(): string {return this._prefixChar;}

    public strings(): readonly string[] {return this._strings;}

    public operands(): readonly string[] {return this._operands;}

    public options(): readonly string[] {return this._options;}

    public flags(): readonly string[] {return this._flags;}

    public isEmpty(): boolean {return this._strings.length === 0;}

    public distinct(): Readonly<OperandsFlagsOptions> {return this._distinct;}

    public toString(format: string | undefined | null = undefined, tabSize: number = 2): string
    {
        const validFormatArgs: readonly (string | undefined | null)[] =
            Object.freeze([undefined, null, "inline", "none", "\n", "\n\n", "\u0020"]);

        if ( ! validFormatArgs.some(validFrmtArg => strEqualsIgnoreCase(validFrmtArg, format)))
        {
            const quotes: string = format !== undefined && format !== null ? '"' : "";

            throw new Error(`illegal string format argument: ${quotes}${format}${quotes}`);
        }

        return "\u0020" === format
                   ?   `\u0020prefixChar: "${this._prefixChar}", `
                     + `operands: ${joinStringsFormatted(this._operands)}, `
                     + `flags: ${joinStringsFormatted(this._flags)}, `
                     + `options: ${joinStringsFormatted(this._options)} `
              : "\n" === format
                  ?   `${" ".repeat(tabSize)}prefixChar: "${this._prefixChar}",\n`
                    + `${" ".repeat(tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                    + `${" ".repeat(tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                    + `${" ".repeat(tabSize)}options: ${joinStringsFormatted(this._options)}\n`
              : "\n\n" === format
                  ?   `\n${" ".repeat(tabSize)}prefixChar: "${this._prefixChar}",\n`
                    + `${" ".repeat(tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                    + `${" ".repeat(tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                    + `${" ".repeat(tabSize)}options: ${joinStringsFormatted(this._options)}\n`
              :   `prefixChar: "${this._prefixChar}", `
                + `operands: ${joinStringsFormatted(this._operands)}, `
                + `flags: ${joinStringsFormatted(this._flags)}, `
                + `options: ${joinStringsFormatted(this._options)}`;
    }
}

const strEqualsIgnoreCase = (aString: string | undefined | null, anotherString: string | undefined | null): boolean =>
{
    if (aString === undefined || aString === null || anotherString === undefined || anotherString === null)
    {
        return aString === anotherString;
    }

    return aString.localeCompare(anotherString, undefined, {sensitivity: "base"}) === 0;
};
