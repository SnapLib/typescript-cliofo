import {CliofoPrefixParser} from "./cliofo-prefix-parser.js";
import {StringParseError} from "./string-parse-error.js";

/**
 * This object uses a specified prefix `string` to parse strings into operands,
 * flags, and options and then count the occurrences of them.
 */
export class CliofoCounts extends CliofoPrefixParser<ReadonlyMap<string, number>>
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
     * Constructs an instance of a `CliofoCount` object using the provided
     * prefix `string` to parse the strings in the provided `string[]` into
     * operands, flags, and options and then count the occurrences of them.
     *
     * @param prefixString
     * @param strings
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
                            throw new StringParseError(`could not parse string to operand, flag, or options: "${aString}"`, aString);
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

export {CliofoCounts as default};
