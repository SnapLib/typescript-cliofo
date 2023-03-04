import {CliofoPrefixParser} from "./cliofo-prefix-parser.js";

export class CliofoCounts extends CliofoPrefixParser<ReadonlyMap<string, number>>
{
    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly operand: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly flag: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     *
     * @public
     * @override
     * @readonly
     */
    public readonly option: ReadonlyMap<string, number>;

    /**
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

        this.operand = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length === 0 || ! aString.startsWith(this.prefixString))
                    .map(aString =>
                        Object.freeze([ aString,
                          this.arguments.filter(anotherString => aString === anotherString).length ]))
            )
        );

        this.flag = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString =>    this.prefixString.length !== 0
                                       && aString.startsWith(this.prefixString)
                                       && ! aString.startsWith(this.optionPrefixString()))
                    // Get every character of the string after the leading prefix string
                    .flatMap(aString => [...new Set(aString.slice(this.prefixString.length))])
                    // Collect every string character to a distinct array of characters
                    .reduce(
                        (charArray, aChar) =>
                            { return [...new Set([...charArray, aChar])];},
                        new Array<string>())
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
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length !== 0 && aString.startsWith(this.optionPrefixString()))
                    .map(aString =>
                        Object.freeze([
                            aString.slice(this.optionPrefixString().length),
                            this.arguments.filter(anotherString => aString === anotherString).length ]))
            )
        );
    }
}

export {CliofoCounts as default};
