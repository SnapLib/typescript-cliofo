import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";
import {joinStringsFormatted} from "./util.js";

/**
 * This class parses an array of string arguments into operands, flags, and
 * options based on a prefix character string. The prefix character string is
 * used to denote if a string is an operand, flag, or option.
 *
 * If a strings is prefixed with no prefix characters, then it's an *operand*.
 * If a string is prefixed with only a single prefix character, then it's a
 * *flag*. If a string is prefixed with 2 or more prefix characters, then it's
 * an *option*.
 *
 * @remarks The flag strings are parsed down to individual characters.
 *
 * @remarks The option and flag strings this object contains do not include the
 *          1 or 2 leading prefix characters they were prefixed with.
 */
export class CliArgPrefixParser extends OperandsFlagsOptions
{
    readonly #prefixChar: string;
    readonly #strings: readonly string[];
    readonly #distinct: Readonly<OperandsFlagsOptions>;


    /**
     * Constructs an object that parses an array of string arguments into
     * operands, flags, and options based on a prefix character string. The
     * passed prefix character string argument is used to denote if a string is
     * an operand, flag, or option.
     *
     * Any string that starts with no prefix character string is an *operand*.
     * Any string that starts with only a single prefix character string is a
     * *flag*. And any string that starts with 2 or more prefix character
     * strings is an *option*.
     *
     * @remarks The option and flag strings this object contains do not include
 *              the 1 or 2 leading prefix character strings they were prefixed
 *              with.
     *
     * @param prefixChar The string used to denote which strings are flags
     *                   and options.
     *
     * @param strings The strings to parse into operands, flags, and options.
     *
     * @constructor
     */
    public constructor(prefixChar: string, strings: readonly string[])
    {
            const optionPrefix: string = prefixChar.repeat(2);

            // Create new array of parsed using prefix char argument to parse
            // strings in string array argument
            const operandsFlagsOptions: Readonly<{ readonly operands: readonly string[],
                                                   readonly flags: readonly string[],
                                                   readonly options: readonly string[] }>
                // reduce passed strings to new array of parsed strings
                = strings.reduce((
                    _operandFlagOptions: Readonly<{ readonly operands: readonly string[],
                                                    readonly flags: readonly string[],
                                                    readonly options: readonly string[] }>,
                    aString: string ) =>
                    {
                        // If string doesn't start with the prefix char string,
                        // add it to operands array
                        if ( ! aString.startsWith(prefixChar))
                        {
                            return Object.freeze({
                                    operands: Object.freeze([..._operandFlagOptions.operands, aString]),
                                    flags: _operandFlagOptions.flags,
                                    options: _operandFlagOptions.options });
                        }
                        // If string starts with 2 or more adjacent prefix char
                        // strings, add string without leading 2 prefix char
                        // strings to options array
                        else if (aString.startsWith(optionPrefix))
                        {
                            return Object.freeze({
                                    operands: _operandFlagOptions.operands,
                                    flags: _operandFlagOptions.flags,
                                    options: Object.freeze([..._operandFlagOptions.options, aString.slice(optionPrefix.length)]) });
                        }
                        // If string starts with only a single prefix char
                        // string, add characters of string without leading
                        // prefix char string to flags array
                        return Object.freeze({
                                operands: _operandFlagOptions.operands,
                                flags: Object.freeze([..._operandFlagOptions.flags, ...aString.slice(prefixChar.length)]),
                                options: _operandFlagOptions.options});
                    },
                // Initial frozen empty operands, flags, and options object
                Object.freeze({ operands: Object.freeze([]),
                                flags: Object.freeze([]),
                                options: Object.freeze([]) }
                ));

            super( operandsFlagsOptions.operands,
                   operandsFlagsOptions.flags,
                   operandsFlagsOptions.options );
            this.#prefixChar = prefixChar;
            this.#strings = strings;
            this.#distinct = Object.freeze(new OperandsFlagsOptions(
                Object.freeze([...new Set(this._operands)]),
                Object.freeze([...new Set(this._flags)]),
                Object.freeze([...new Set(this._options)])
            ));
    }

    /**
     * Returns the string used to denote flags and options.
     *
     * @returns The string used to denote flags and options.
     */
    public prefixChar(): string {return this.#prefixChar;}

    /**
     * Returns this object's strings to parse.
     *
     * @returns This object's strings to parse.
     */
    public strings(): readonly string[] {return this.#strings;}

    /**
     * Returns the operand arguments parsed from this object's strings.
     *
     * @returns The operand arguments parsed from this object's strings.
     */
    public operands(): readonly string[] {return this._operands;}

    /**
     * Returns the flag arguments parsed from this object's strings.
     *
     * @remarks The leading prefix character string is omitted from these flag
     *          strings.
     *
     * @returns The operand arguments parsed from this object's strings.
     */
    public flags(): readonly string[] {return this._flags;}

    /**
     * Returns the option arguments parsed from this object's strings.
     *
     * @remarks The leading 2 adjacent prefix character strings are omitted from
     *          these option strings.
     *
     * @returns The option arguments parsed from this object's strings.
     */
    public options(): readonly string[] {return this._options;}

    /**
     * Returns `true` if this object contains 0 strings to parse.
     *
     * @returns `true` if this object contains 0 strings to parse.
     */
    public isEmpty(): boolean {return this.#strings.length === 0;}

    /**
     * An object containing distinct copies of this object's parsed operands,
     * flags, and options.
     *
     * @returns An object containing distinct copies of this object's parsed
     *          operands, flags, and options.
     */
    public distinct(): Readonly<OperandsFlagsOptions> {return this.#distinct;}

    /**
     * Returns the string representation fo this object that can optionally
     * formatted in various ways.
     *
     * @param format Specifies how to format the outputted string
     *               representation of this object.
     *
     * @param tabSize Specifies how many spaces tabs used for indentation should
     *                contain if any used.
     *
     * @returns the string representation fo this object.
     */
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
                     ?   `\u0020prefixChar: "${this.#prefixChar}", `
                       + `operands: ${joinStringsFormatted(this._operands)}, `
                       + `flags: ${joinStringsFormatted(this._flags)}, `
                       + `options: ${joinStringsFormatted(this._options)}\u0020`
                   : "\n" === format
                       ?   `prefixChar: "${this.#prefixChar}",\n`
                         + `${" ".repeat(_tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                         + `${" ".repeat(_tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                         + `${" ".repeat(_tabSize)}options: ${joinStringsFormatted(this._options)}\n`
                   : "\n\n" === format
                       ?   `\n${" ".repeat(_tabSize)}prefixChar: "${this.#prefixChar}",\n`
                         + `${" ".repeat(_tabSize)}operands: ${joinStringsFormatted(this._operands)},\n`
                         + `${" ".repeat(_tabSize)}flags: ${joinStringsFormatted(this._flags)},\n`
                         + `${" ".repeat(_tabSize)}options: ${joinStringsFormatted(this._options)}\n`
                   :    `prefixChar: "${this.#prefixChar}", `
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
