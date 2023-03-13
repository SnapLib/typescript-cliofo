import {PrefixParser} from "./prefix-parser.js";
import {ParseError} from "./parse-error.js";
import {type OperandFlagOption} from "../operand-flag-option.js";

/**
 * This class sorts an array of `string`s into ***operand***, ***flag***, and
 * ***option*** string arrays based on a prefix `string`. The *prefix string*
 * is used to denote if a `string` is an operand, flag, or option.
 *
 * @example
 * ```typescript
 * const cliofoStrings: CliofoStrings = new CliofoStrings("-", ["--foo", "-bar", "baz", "-Aax", "--a", "meep"]);
 *
 * // Creates the following object:
 * {
 *     prefixString: '-',
 *     arguments: [ '--foo', '-bar', 'baz', '--Aax', '--a', 'meep' ],
 *     operandStrings: [ 'baz', 'meep' ],
 *     flagStrings: [ 'b', 'a', 'r', 'A', 'a', 'x' ],
 *     optionStrings: [ `foo`, 'a' ],
 *     allStrings: [ `baz`, 'b', 'a', 'r', `foo`, 'A', 'a', 'x', 'a', 'meep' ]
 * }
 * ```
 *
 * @remarks
 * This class attempts to be as immutable as possible.
 *
 * @see {@link PrefixParser}
 */
export class Strings extends PrefixParser<readonly string[]>
{
    /**
     * A readonly string array of operands. These include arguments that aren't
     * prefixed with this object's {@link prefixString} or all arguments if the
     * `prefixString` is an empty string (`""`).
     *
     * @public
     * @override
     * @readonly
     */
    public readonly operand: readonly string[];

    /**
     * A readonly string array of flags. These include arguments that are
     * prefixed with only a single leading instance of this object's
     * {@link prefixString}.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly flag: readonly string[];

    /**
     * A readonly string array of options. These include arguments that are
     * prefixed with a leading sequence of 2 or more adjacent instances of this
     * object's {@link prefixString}.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly option: readonly string[];

    /**
     * Constructs an object that parses an array of strings into *operands*,
     * *flags*, and *options* based on a leading prefix `string`. The passed
     * prefix `string` is used to denote if a string is an operand, flag, or
     * option.
     *
     * Any ***argument*** `string` that doesn't start with a leading prefix
     * `string` is an *operand*. Any ***argument*** `string` that starts with
     * only a single prefix character `string` is a *flag*. And any
     * ***argument*** `string` that starts with 2 or more prefix strings is an
     * *option*.
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
     * @param prefixString The string used to denote which strings are flags and
     *                     options (and operands).
     *
     * @param strings The strings to sort into operands, flags, and options
     *                based on the `prefixString`.
     *
     * @throws {ParseError} If a `string` can't be parsed to an operand, flag,
     *                      or options.
     *
     * @public
     * @constructor
     */
    public constructor(prefixString: string, strings: readonly string[])
    {
            super(prefixString, strings);

            // Create object containing string arguments sorted into operands,
            // flags, and options
            const operandsFlagsOptions: Readonly<OfoStrings>
            // reducing string arguments into sorted operands, flags, options object
            = this.arguments.reduce((
                _operandFlagOptions: Readonly<OfoStrings>,
                aString: string ) =>
                {
                    // If prefixString is empty or argument string doesn't start
                    // with prefixString, add it to operands array
                    if (prefixString.length === 0 || ! aString.startsWith(prefixString))
                    {
                        return Object.freeze({
                                operandStrings: Object.freeze([..._operandFlagOptions.operandStrings, aString]),
                                flagStrings: _operandFlagOptions.flagStrings,
                                optionStrings: _operandFlagOptions.optionStrings });
                    }
                    // If string starts with 2 or more adjacent prefix strings,
                    // add string without leading 2 prefix char strings to
                    // options array
                    else if (aString.startsWith(this.optionPrefixString()))
                    {
                        return Object.freeze({
                                operandStrings: _operandFlagOptions.operandStrings,
                                flagStrings: _operandFlagOptions.flagStrings,
                                optionStrings: Object.freeze([..._operandFlagOptions.optionStrings, aString.slice(this.optionPrefixString().length)]) });
                    }
                    // If string starts with only a single prefix string, add
                    // characters of string excluding leading prefix string
                    // to flags array
                    else if (aString.startsWith(this.prefixString))
                    {
                        return Object.freeze({
                            operandStrings: _operandFlagOptions.operandStrings,
                            flagStrings: Object.freeze([..._operandFlagOptions.flagStrings, ...aString.slice(this.prefixString.length)]),
                            optionStrings: _operandFlagOptions.optionStrings});
                    }
                    // Throw error if prefix string and argument string can't be
                    // parsed down to operand, flag, or option. This should be
                    // impossible to throw in most circumstances.
                    else
                    {
                        throw new ParseError(`could not parse string to operand, flag, or option: "${aString}"`);
                    }

                },
                // Initial frozen empty operands, flags, and options object
                Object.freeze({ operandStrings: Object.freeze([]),
                                flagStrings: Object.freeze([]),
                                optionStrings: Object.freeze([]) }
            ));

        this.operand = operandsFlagsOptions.operandStrings;
        this.flag = operandsFlagsOptions.flagStrings;
        this.option = operandsFlagsOptions.optionStrings;
    }
}

type OfoStrings = {readonly [Ofo in keyof OperandFlagOption<readonly string[]> as `${Ofo}Strings`]: OperandFlagOption<readonly string[]>[Ofo]};

export {Strings as default};
