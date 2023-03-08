import {PrefixParser} from "./prefix-parser.js";
import {ParseError} from "./string-parse-error.js";

/**
 * This object uses a specified prefix `string` to parse strings into operands,
 * flags, and options and then count the occurrences of them in a provided
 * `string` array.
 *
 * @example
 * Below is an example of how this object sorts the strings of a string array
 * into operands, flags, and options and then maps each one to the number of
 * times they are present in the string array:
 * ```typescript
 * const cliofoCounts = new CliofoCounts("-", ["-foox", "bar", "--baz", "-a", "-xyz", "--baz", "meep", "--yeet"]);
 *
 * // Creates a CliofoCounts object with the following properties:
 * {
 *   prefixString: '-',
 *   arguments: [ '-foox',  'bar', '--baz', '-a', '-xyz',  '--baz', 'meep',  '--yeet' ],
 *   operand: Map(2) { 'bar' => 1, 'meep' => 1 },
 *   flag: Map(6) { 'f' => 1, 'o' => 2, 'a' => 1, 'x' => 2, 'y' => 1, 'z' => 1 },
 *   option: Map(2) { 'baz' => 2, 'yeet' => 1 }
 * }
 * ```
 * @remarks This class attempts to be as immutable as possible.
 */
export class Counts extends PrefixParser<ReadonlyMap<string, number>>
{
    /**
     * A map containing the operand strings as keys mapped to the number of
     * times they occur as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly operand: ReadonlyMap<string, number>;

    /**
     * A map containing the flag characters as keys mapped to the number of
     * times they occur as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly flag: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys mapped to the number of
     * times they occur as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly option: ReadonlyMap<string, number>;

    /**
     * Constructs an object that uses the provided prefix `string` to parse the
     * strings in the provided `string[]` into operands, flags, and options and
     * then count the occurrences of them.
     *
     * @param prefixString The `string` used to denote which strings are
     *                     operands, flags, or options.
     *
     * @param strings The strings to parse into operands, flags, and options and
     *                then count the occurrences of.
     *
     * @example
     * Below is an example of how this object sorts the strings of a string array
     * into operands, flags, and options and then maps each one to the number of
     * times they are present in the string array:
     * ```typescript
     * const cliofoCount = new CliofoCount("-", ["-foox", "bar", "--baz", "-a", "-xyz", "--baz", "meep", "--yeet"]);
     *
     * // Creates a CliofoCount object with the following properties:
     * {
     *   prefixString: '-',
     *   arguments: [ '-foox',  'bar', '--baz', '-a', '-xyz',  '--baz', 'meep',  '--yeet' ],
     *   operand: Map(2) { 'bar' => 1, 'meep' => 1 },
     *   flag: Map(6) { 'f' => 1, 'o' => 2, 'a' => 1, 'x' => 2, 'y' => 1, 'z' => 1 },
     *   option: Map(2) { 'baz' => 2, 'yeet' => 1 }
     * }
     *
     * ```
     *
     * @remarks This class attempts to be as immutable as possible.
     *
     * @public
     * @constructor
     */
    public constructor(prefixString: string, strings: readonly string[])
    {
        super(prefixString, strings);

        const distinctString: Readonly<{ operands: readonly string[],
                                         flagChars: readonly string[],
                                         options: readonly string[] }>
            = Object.freeze(
                [...new Set(this.arguments)]
                .reduce(
                    (ofo, aString) => {
                        // if string is operand
                        if (this.prefixString.length === 0 || ! aString.startsWith(this.prefixString))
                        {
                            return Object.freeze(
                                { operands: Object.freeze([...ofo.operands, aString]),
                                  flagChars: ofo.flagChars,
                                  options: ofo.options });
                        }
                        // if string starts with prefix string
                        else if (aString.startsWith(this.prefixString))
                        {
                            // if string is options
                            if (aString.startsWith(this.optionPrefixString()))
                            {
                                return Object.freeze(
                                    { operands: ofo.operands,
                                      flagChars: ofo.flagChars,
                                      options: Object.freeze([...ofo.options, aString]) });
                            }
                            // if string is flag
                            else
                            {
                                return Object.freeze(
                                    { operands: ofo.operands,
                                      flagChars: Object.freeze([...new Set([...ofo.flagChars, ...aString.slice(this.prefixString.length)])]),
                                      options: ofo.options });
                            }
                        }
                        else
                        {
                            throw new ParseError(`could not parse string to operand, flag, or options: "${aString}"`, aString);
                        }
                    },
                    { operands: Object.freeze(new Array<string>()),
                      flagChars: Object.freeze(new Array<string>()),
                      options: Object.freeze(new Array<string>()) }
                )
            );

        this.operand = Object.freeze(
            new Map(
                distinctString.operands
                    .map(aString =>
                        Object.freeze([ aString,
                          this.arguments.filter(anotherString => aString === anotherString).length ]))
            )
        );

        this.flag = Object.freeze(
            new Map(
                distinctString.flagChars
                    // Create array of distinct character keys paired with the
                    // number of times they occur in strings
                    .map(aChar =>
                        // character key
                        Object.freeze([ aChar,
                          this.arguments.filter(aString =>    aString.startsWith(this.prefixString)
                                                           && ! aString.startsWith(this.optionPrefixString()))
                            // Count the number of characters that are in each string
                            .reduce(
                                (charCount, aString) =>
                                    { return charCount
                                        + [...aString.slice(this.prefixString.length)]
                                          .filter(anotherChar => aChar === anotherChar).length; },
                                0
                            )
                        ])
                    )
            )
        );

        this.option = Object.freeze(
            new Map(
                distinctString.options
                    .map(aString =>
                        Object.freeze([
                            aString.slice(this.optionPrefixString().length),
                            this.arguments.filter(anotherString => aString === anotherString).length ]))
            )
        );
    }
}

export {Counts as default};
