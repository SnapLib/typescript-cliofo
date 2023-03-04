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
                        [ aString,
                          this.arguments.filter(anotherString => aString === anotherString).length ])
            )
        );

        this.flag = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString =>    this.prefixString.length !== 0
                                       && aString.startsWith(this.prefixString)
                                       && ! aString.startsWith(this.optionPrefixString()))
                    .flatMap(aString => [...new Set(aString.slice(this.prefixString.length))])
                    .reduce((charArray, aChar) => {return Object.freeze([...new Set([...charArray, aChar])]);}, Object.freeze(new Array<string>()))
                    .map(aChar =>
                        [ aChar,
                          this.arguments.filter(aString => aString.startsWith(this.prefixString) && ! aString.startsWith(this.optionPrefixString())).reduce((charCount, aString) => {return charCount + [...aString].filter(anotherChar => aChar === anotherChar).length;}, 0) ])
            )
        );

        this.option = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length !== 0 && aString.startsWith(this.optionPrefixString()))
                    .map(aString =>
                        [ aString.slice(this.optionPrefixString().length),
                          this.arguments.filter(anotherString => aString === anotherString).length ])
            )
        );
    }
}

export {CliofoCounts as default};
