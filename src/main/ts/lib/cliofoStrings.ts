import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";

/**
 * This class parses an array of `string` arguments into operands, flags, and
 * options based on a *prefix string*. The *prefix string* is used to denote if
 * a `string` argument is an operand, flag, or option.
 *
 * If a string isn't prefixed with a leading prefix string, then it's an
 * *operand*. If a string is prefixed with only a single leading prefix string,
 * then it's a *flag*. If a string is prefixed with 2 or more adjacent leading
 * prefix strings, then it's an *option*.
 *
 * @remarks
 * - The flag and option strings do not include the 1 or 2 leading prefix
 *   strings they were prefixed with to denote them as a flag or option. For
 *   example, the leading hyphen characters (`"-"` and `"--"`) in the strings
 *   `"-foo"` and `"--bar"` would be ignored if the prefix string is a hyphen
 *   character.
 *
 * - All flag strings are parsed down to their individual characters. For
 *   example the string `"-foo"` would be stored as the ***flags***
 *   `["f", "o", "o"]` if the leading hyphen character (`"-"`) is the prefix
 *   string.
 *
 * - This class is immutable, All of this class' properties are readonly and any
 *   objects it returns are frozen.
 */
export class CliofoStrings extends OperandsFlagsOptions
{
    /**
     * A readonly `string` array of this operands.
     * @readonly
     */
    public readonly operandStrings: readonly string[];

    /**
     * A readonly `string` array of flags.
     * @readonly
     */
    public readonly flagStrings: readonly string[];

    /**
     * A readonly `string` array of options.
     * @readonly
     */
    public readonly optionStrings: readonly string[];

    /**
     * A readonly `string` array of options.
     * @readonly
     */
    public readonly allStrings: readonly string[];

    /**
     * Constructs an object that parses an array of string arguments into
     * *operands*, *flags*, and *options* based on a leading prefix `string`.
     * The passed prefix `string` is used to denote if an argument is an
     * operand, flag, or option.
     *
     * Any ***argument*** `string` that doesn't start a leading prefix string is
     * an *operand*. Any ***argument*** `string` that starts with only a single
     * prefix character `string` is a *flag*. And any ***argument*** `string`
     * that starts with 2 or more prefix strings is an *option*.
     *
     * @remarks
     * - The flag and option strings do not include the 1 or 2 leading prefix
     *   strings they were prefixed with to denote them as a flag or option. For
     *   example, the leading hyphen characters (`"-"` and `"--"`) in the
     *   strings `"-foo"` and `"--bar"` would be ignored if the prefix string is
     *   a hyphen character(`"-"`).
     *
     * - All flag strings are parsed down to their individual characters. For
     *   example, the string `"-foo"` would be stored as the ***flags***
     *   `["f", "o", "o"]` if the leading hyphen character (`"-"`) is the prefix
     *   string.
     *
     * @param prefixString The string used to denote which arguments are flags
     *                     and options.
     *
     * @param args The arguments to parse into operands, flags, and options.
     *
     * @constructor
     */
    public constructor(prefixString: string, args: readonly string[])
    {
            super(prefixString, args);
            const optionPrefix: string = prefixString.repeat(2);

            // Create new array of parsed using prefix char argument to parse
            // strings in string array argument
            const operandsFlagsOptions: Readonly<{ readonly operands: readonly string[],
                                                   readonly flags: readonly string[],
                                                   readonly options: readonly string[] }>
            // reduce passed strings to new array of parsed strings
            = this.arguments.reduce((
                _operandFlagOptions: Readonly<{ readonly operands: readonly string[],
                                                readonly flags: readonly string[],
                                                readonly options: readonly string[] }>,
                aString: string ) =>
                {
                    // If string doesn't start with the prefix char string,
                    // add it to operands array
                    if ( ! aString.startsWith(this.prefixString))
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
                            flags: Object.freeze([..._operandFlagOptions.flags, ...aString.slice(this.prefixString.length)]),
                            options: _operandFlagOptions.options});
                },
                // Initial frozen empty operands, flags, and options object
                Object.freeze({ operands: Object.freeze([]),
                                flags: Object.freeze([]),
                                options: Object.freeze([]) }
            ));

        this.operandStrings = operandsFlagsOptions.operands;
        this.flagStrings = operandsFlagsOptions.flags;
        this.optionStrings = operandsFlagsOptions.options;
        this.allStrings = Object.freeze([...this.operandStrings, ...this.flagStrings, ...this.optionStrings]);
    }
}

export {CliofoStrings as default};
