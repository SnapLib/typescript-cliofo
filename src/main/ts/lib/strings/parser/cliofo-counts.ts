import {CliofoPrefixParser} from "./cliofo-prefix-parser.js";
import {CliofoStrings} from "./cliofo-strings.js";

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
     *
     * @todo remove internal dependency on {@link CliofoStrings}` object.
     */
    public constructor(prefixString: string, strings: readonly string[])
    {
        super(prefixString, strings);
        const cliofoStrings: Readonly<CliofoStrings> = Object.freeze(new CliofoStrings(prefixString, strings));

        this.operand = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length === 0 || ! aString.startsWith(this.prefixString))
                    .map(aString =>
                        [ aString,
                          this.arguments.filter(anotherString => aString === anotherString).length ])
            )
        );

        // TODO remove dependency on CliofoStrings object.
        this.flag = Object.freeze(new Map([...new Set(cliofoStrings.flag)].map(flagString => Object.freeze(
            [flagString, cliofoStrings.flag.filter(otherFlagString => flagString === otherFlagString).length]) )));

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
