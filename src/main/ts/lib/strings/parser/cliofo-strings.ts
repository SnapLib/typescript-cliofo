import {CliofoPrefixParser} from "./cliofo-prefix-parser.js";
import {isOperand, isFlag, isOption} from "./util.js";
import {StringParseError} from "./string-parse-error.js";

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
 * @example
 * ```typescript
 * const cliofoStrings: CliofoStrings = new CliofoStrings("-", "--foo -bar baz");
 *
 * // Creates the following object:
 * {
 *     prefixString: '-',
 *     arguments: [ '--foo', '-bar', 'baz' ],
 *     operandStrings: [ `baz` ],
 *     flagStrings: [ 'b', 'a', 'r' ],
 *     optionStrings: [ `foo` ],
 *     allStrings: [ `baz`, 'b', 'a', 'r', `foo` ]
 * }
 * ```
 *
 * @remarks
 * - All flag strings are parsed down to their individual characters. For
 *   example the string `"-foo"` would be stored as the ***flags***
 *   `["f", "o", "o"]` if the leading hyphen character (`"-"`) is the prefix
 *   string.
 *
 * - The flag and option strings do not include the 1 or 2 leading prefix
 *   strings they were prefixed with to denote them as a flag or option. For
 *   example, the leading hyphen characters (`"-"` and `"--"`) in the strings
 *   `"-foo"` and `"--bar"` would be ignored if the prefix string is a hyphen
 *   character(`"-"`).
 *
 * - This class attempts to be as immutable as possible.
 */
export class CliofoStrings extends CliofoPrefixParser<readonly string[]>
{
    /**
     * A readonly string array of operands. These include arguments that aren't
     * prefixed with this object's {@link prefixString} or all arguments if the
     * `prefixString` is an empty string.
     * @readonly
     */
    public readonly operandStrings: readonly string[];

    /**
     * A readonly string array of flags. These include arguments that are
     * prefixed with only a single leading instance of this object's
     * {@link prefixString}.
     * @readonly
     */
    public readonly flagStrings: readonly string[];

    /**
     * A readonly string array of options. These include arguments that are
     * prefixed with a leading sequence of 2 or more adjacent instances of this
     * object's {@link prefixString}.
     * @readonly
     */
    public readonly optionStrings: readonly string[];

    /**
     * A readonly string array of all operands, flags, and options.
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

            // Create object containing string arguments sorted into operands,
            // flags, and options
            const operandsFlagsOptions: Readonly<Record<string, readonly string[]>>
            // reducing string arguments into sorted operands, flags, options object
            = this.arguments.reduce((
                _operandFlagOptions: Readonly<Record<string, readonly string[]>>,
                aString: string ) =>
                {
                    // If prefixString is empty or argument string doesn't start
                    // with prefixString, add it to operands array
                    if (prefixString.length === 0 || ! aString.startsWith(prefixString))
                    {
                        return Object.freeze({
                                operands: Object.freeze([..._operandFlagOptions.operands, aString]),
                                flags: _operandFlagOptions.flags,
                                options: _operandFlagOptions.options });
                    }
                    // If string starts with 2 or more adjacent prefix strings,
                    // add string without leading 2 prefix char strings to
                    // options array
                    else if (aString.startsWith(this.optionPrefixString()))
                    {
                        return Object.freeze({
                                operands: _operandFlagOptions.operands,
                                flags: _operandFlagOptions.flags,
                                options: Object.freeze([..._operandFlagOptions.options, aString.slice(this.optionPrefixString().length)]) });
                    }
                    // If string starts with only a single prefix string, add
                    // characters of string excluding leading prefix string
                    // to flags array
                    else if (aString.startsWith(this.prefixString))
                    {
                        return Object.freeze({
                            operands: _operandFlagOptions.operands,
                            flags: Object.freeze([..._operandFlagOptions.flags, ...aString.slice(this.prefixString.length)]),
                            options: _operandFlagOptions.options});
                    }
                    // Throw error if prefix string and argument string can't be
                    // parsed down to operand, flag, or option. This should be
                    // impossible to throw in most circumstances.
                    else
                    {
                        throw new StringParseError(`could not parse string to operand, flag, or options: "${aString}"`, aString);
                    }

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
