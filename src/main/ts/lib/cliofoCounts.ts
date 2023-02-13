import {CliofoStrings} from "./cliofoStrings.js";

export class CliofoCounts
{
    public readonly cliofoStrings: Readonly<CliofoStrings>;

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
        this.cliofoStrings = Object.freeze(new CliofoStrings(prefixString, args));

        this.operandCounts = Object.freeze(new Map([...new Set(this.cliofoStrings.operandStrings)].map(operandString => Object.freeze(
            [operandString, this.cliofoStrings.operandStrings.filter(otherOperandString => operandString === otherOperandString).length]) )));

        this.flagCounts = Object.freeze(new Map([...new Set(this.cliofoStrings.flagStrings)].map(flagString => Object.freeze(
            [flagString, this.cliofoStrings.flagStrings.filter(otherFlagString => flagString === otherFlagString).length]) )));

        this.optionCounts = Object.freeze(new Map([...new Set(this.cliofoStrings.optionStrings)].map(optionString => Object.freeze(
            [optionString, this.cliofoStrings.optionStrings.filter(otherOptionString => optionString === otherOptionString).length]) )));

        this.allCounts = Object.freeze(new Map([...new Set(this.cliofoStrings.allStrings)].map(operandFlagOption => Object.freeze(
            [ operandFlagOption,
              this.cliofoStrings.allStrings.filter(otherOperandFlagOption => operandFlagOption === otherOperandFlagOption).length]) )));
    }
}

export {CliofoCounts as default};
