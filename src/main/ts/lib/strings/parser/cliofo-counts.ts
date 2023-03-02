import {CliofoPrefixParser} from "./cliofo-prefix-parser.js";
import {CliofoStrings} from "./cliofo-strings.js";

export class CliofoCounts extends CliofoPrefixParser<ReadonlyMap<string, number>>
{
    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly operandCounts: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly flagCounts: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly optionCounts: ReadonlyMap<string, number>;

    public readonly allCounts: ReadonlyMap<string, number>;

    public constructor(prefixString: string, args: readonly string[])
    {
        super(prefixString, args);
        const cliofoStrings: Readonly<CliofoStrings> = Object.freeze(new CliofoStrings(prefixString, args));

        this.operandCounts = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length === 0 || ! aString.startsWith(this.prefixString))
                    .map(aString =>
                        [ aString,
                          this.arguments.filter(anotherString => aString === anotherString).length ])
            )
        );

        // TODO remove dependency on CliofoStrings object.
        this.flagCounts = Object.freeze(new Map([...new Set(cliofoStrings.flagStrings)].map(flagString => Object.freeze(
            [flagString, cliofoStrings.flagStrings.filter(otherFlagString => flagString === otherFlagString).length]) )));

        this.optionCounts = Object.freeze(
            new Map(
                [...new Set(this.arguments)]
                    .filter(aString => this.prefixString.length !== 0 && aString.startsWith(this.optionPrefixString()))
                    .map(aString =>
                        [ aString.slice(this.optionPrefixString().length),
                          this.arguments.filter(anotherString => aString === anotherString).length ])
            )
        );

        this.allCounts = Object.freeze(new Map([...new Set([...this.operandCounts.keys(), ...this.flagCounts.keys(), ...this.optionCounts.keys()])].map(operandFlagOption => Object.freeze(
            [ operandFlagOption,
              cliofoStrings.allStrings.filter(otherOperandFlagOption => operandFlagOption === otherOperandFlagOption).length]) )));
    }
}

export {CliofoCounts as default};
