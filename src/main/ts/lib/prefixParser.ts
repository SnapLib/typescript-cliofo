import {OperandFlagOptionOccurrenceCount} from "./operandFlagOptionOccurrence.js";
import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";

/**
 * This class parses an array of `string` arguments into operands, flags, and
 * options based on a *prefix string*. The *prefix string* is used to denote if
 * a `string` is an operand, flag, or option.
 *
 * If a string isn't prefixed with a string, then it's an *operand*. If a
 * string is prefixed with only a single leading prefix string, then it's a
 * *flag*. If a string is prefixed with 2 or more adjacent leading prefix
 * strings, then it's an *option*.
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
 */
export class PrefixParser extends OperandsFlagsOptions
{
    readonly #prefixString: string;
    readonly #strings: readonly string[];
    readonly #occurrenceCount: Readonly<OperandFlagOptionOccurrenceCount>;
    readonly #jsonEntries: ReadonlyArray<readonly [string, string | readonly string[] | Readonly<OperandFlagOptionOccurrenceCount>]>;


    /**
     * Constructs an object that parses an array of `string` arguments into
     * operands, flags, and options based on a leading prefix string. The passed
     * prefix string argument is used to denote if a string is an operand, flag,
     * or option.
     *
     * Any string that starts with no prefix character string is an *operand*.
     * Any string that starts with only a single prefix character string is a
     * *flag*. And any string that starts with 2 or more prefix character
     * strings is an *option*.
     *
     * @remarks
     * - The flag and option strings do not include the 1 or 2 leading prefix
     *   strings they were prefixed with to denote them as a flag or option. For
     *   example, the leading hyphen characters (`"-"` and `"--"`) in the
     *   strings `"-foo"` and `"--bar"` would be ignored if the prefix string is
     *   a hyphen character.
     *
     * - All flag strings are parsed down to their individual characters. For
     *   example the string `"-foo"` would be stored as the ***flags***
     *   `["f", "o", "o"]` if the leading hyphen character (`"-"`) is the prefix
     *   string.
     *
     * @param prefixString The string used to denote which strings are flags
     *                     and options.
     *
     * @param strings The strings to parse into operands, flags, and options.
     *
     * @constructor
     */
    public constructor(prefixString: string, strings: readonly string[])
    {
            const optionPrefix: string = prefixString.repeat(2);

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
                    if ( ! aString.startsWith(prefixString))
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
                            flags: Object.freeze([..._operandFlagOptions.flags, ...aString.slice(prefixString.length)]),
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
        this.#prefixString = prefixString;
        this.#strings = Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
        this.#occurrenceCount = Object.freeze(new OperandFlagOptionOccurrenceCount(this));
        this.#jsonEntries = Object.freeze([
            ["prefixString", this.#prefixString],
            ["strings", this.#strings],
            ["operands", this._operands],
            ["flags", this._flags],
            ["options", this._options],
            ["occurrences", this.#occurrenceCount]
        ]);
    }

    /**
     * Returns the string used to denote flags and options.
     *
     * @returns The string used to denote flags and options.
     */
    public prefixString(): string {return this.#prefixString;}

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
     * Returns an {@link OperandFlagOptionOccurrenceCount} object used to count
     * the occurrences of each operand, flag, and option.
     *
     * @returns An {@link OperandFlagOptionOccurrenceCount} object used to count
     * the occurrences of each operand, flag, and option.
     */
    // public occurrenceCount(): Readonly<OperandFlagOptionOccurrenceCount>
    //     {return this.#occurrenceCount;}

    /**
     * Returns the JSON string representation of this object.
     *
     * @remarks The `format.replacer` and `format.space` parameters are passed
     *          to the `JSON.stringify(...)` method that's called internally.
     *          Below are the doc comments directly from the
     *          {@link JSON.stringify()} `replacer` and `space` parameters.
     *
     * @param stringFormat
     * Various options used to format the json string output of this method. The
     * following format options are:
     *
     * - `verbose`
     *   Boolean flag indicating whether output should include all object
     *   properties or just the main ones.
     *
     * - `replacer`
     *   A function that alters the behavior of the stringification process, or
     *   an array of strings and numbers that specifies properties of value to
     *   be included in the output. If replacer is an array, all elements in
     *   this array that are not strings or numbers (either primitives or
     *   wrapper objects), including Symbol values, are completely ignored. If
     *   replacer is anything other than a function or an array (e.g. null or
     *   not provided), all string-keyed properties of the object are included
     *   in the resulting JSON string.
     *
     * - `space`
     *   A `string` or `number` that's used to insert white space (including
     *   indentation, line break characters, etc.) into the output JSON string
     *   for readability purposes. If this is a number, it indicates the number
     *   of space characters to be used as indentation, clamped to 10 (that is,
     *   any number greater than 10 is treated as if it were 10). Values less
     *   than 1 indicate that no space should be used. If this is a string, the
     *   string (or the first 10 characters of the string, if it's longer than
     *   that) is inserted before every nested object or array.
     *
     * @returns the JSON string representation of this object.
     */
    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        const obj: Readonly<object> = Object.freeze(Object.fromEntries(
            format.verbose
                ? this.#jsonEntries
                : this.#jsonEntries.filter(jsonEntry => "strings" === jsonEntry[0])
        ));

        return `${PrefixParser.name} ${JSON.stringify(obj, format.replacer, format.space)}`;
    }
}
