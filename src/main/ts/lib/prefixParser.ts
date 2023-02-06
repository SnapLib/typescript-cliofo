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

            const operandsFlagsOptions: Readonly<{ readonly operands: readonly string[],
                                                   readonly flags: readonly string[],
                                                   readonly options: readonly string[] }>
                = strings.reduce((
                    operandFlagOptionsTuple: Readonly<{ readonly operands: readonly string[],
                                                        readonly options: readonly string[],
                                                        readonly flags: readonly string[] }>,
                    aString: string) =>
                {
                    // If no prefix char, save entire string to index
                    if ( ! aString.startsWith(prefixChar))
                    {
                        return Object.freeze({
                                   operands: Object.freeze([...operandFlagOptionsTuple.operands, aString]),
                                   flags: operandFlagOptionsTuple.flags,
                                   options: operandFlagOptionsTuple.options });
                    }
                    // If starts with 2 or more adjacent prefix chars, save string
                    // without leading 2 prefix chars
                    else if (aString.startsWith(optionPrefix))
                    {
                        return Object.freeze({
                                   operands: operandFlagOptionsTuple.operands,
                                   flags: operandFlagOptionsTuple.flags,
                                   options: Object.freeze([...operandFlagOptionsTuple.options, aString.slice(optionPrefix.length)]) });
                    }

                    // If starts with only a single prefix char, save characters of
                    // string without leading prefix char
                    return Object.freeze({
                               operands: operandFlagOptionsTuple.operands,
                               flags: Object.freeze([...operandFlagOptionsTuple.flags, ...aString.slice(prefixChar.length)]),
                               options: operandFlagOptionsTuple.options});
                },
                // Initial frozen empty operands, flags, and options object
                Object.freeze({ operands: Object.freeze([]),
                                flags: Object.freeze([]),
                                options: Object.freeze([]) }
                ));

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

    public toString(format: string | undefined | null = null, tabSize: number | undefined | null = null): string
    {
        const validFormatArgs: readonly (string | undefined | null)[] =
            Object.freeze([undefined, null, "inline", "none", "verbose", "\n", "\n\n", "\u0020"]);

        if ( ! validFormatArgs.some(validFrmtArg => strEqualsIgnoreCase(validFrmtArg, format)))
        {
            const quotes: string = format !== undefined && format !== null ? '"' : "";

            throw new Error(`illegal string format argument: ${quotes}${format}${quotes}`);
        }

        const _tabSize: number = tabSize === undefined ? 0 : tabSize === null ? 4 : tabSize;

        return   `${OperandsFlagsOptions.name}{`
               + ( "\u0020" === format
                     ?   `\u0020prefixChar: "${this._prefixChar}", `
                       + `operands: ${joinStringsFormatted(this._operands)}, `
                       + `flags: ${joinStringsFormatted(this._flags)}, `
                       + `options: ${joinStringsFormatted(this._options)}\u0020`
                   : "\n" === format
                       ?   `prefixChar: "${this._prefixChar}",\n`
                         + `${" ".repeat(_tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                         + `${" ".repeat(_tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                         + `${" ".repeat(_tabSize)}options: ${joinStringsFormatted(this._options)}\n`
                   : "\n\n" === format
                       ?   `\n${" ".repeat(_tabSize)}prefixChar: "${this._prefixChar}",\n`
                         + `${" ".repeat(_tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                         + `${" ".repeat(_tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                         + `${" ".repeat(_tabSize)}options: ${joinStringsFormatted(this._options)}\n`
                   :    `prefixChar: "${this._prefixChar}", `
                      + `operands: ${joinStringsFormatted(this._operands)}, `
                      + `flags: ${joinStringsFormatted(this._flags)}, `
                      + `options: ${joinStringsFormatted(this._options)}`)
               + "}";
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
