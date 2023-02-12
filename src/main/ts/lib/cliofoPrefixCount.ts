import {CliofoPrefixStrings} from "./cliofoPrefixStrings.js";

export class CliofoPrefixCount
{
    public readonly prefixParser: Readonly<CliofoPrefixStrings>;

    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly operandsCount: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly flagsCount: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly optionsCount: ReadonlyMap<string, number>;

    public readonly allCount: ReadonlyMap<string, number>;

    public constructor(operandFlagOptionStrings: Readonly<CliofoPrefixStrings>)
    {
        this.prefixParser = freezeOperandsFlagsOptionStrings(operandFlagOptionStrings);

        this.operandsCount = Object.freeze(new Map([...new Set(this.prefixParser.operands)].map(operandString => Object.freeze(
            [operandString, operandFlagOptionStrings.operands.filter(otherOperandString => operandString === otherOperandString).length]) )));

        this.flagsCount = Object.freeze(new Map([...new Set(this.prefixParser.flags)].map(flagString => Object.freeze(
            [flagString, operandFlagOptionStrings.flags.filter(otherFlagString => flagString === otherFlagString).length]) )));

        this.optionsCount = Object.freeze(new Map([...new Set(this.prefixParser.options)].map(optionString => Object.freeze(
            [optionString, operandFlagOptionStrings.options.filter(otherOptionString => optionString === otherOptionString).length]) )));

        this.allCount = Object.freeze(new Map([...new Set(this.prefixParser.all)].map(operandFlagOption => Object.freeze(
            [ operandFlagOption,
              this.prefixParser.all.filter(otherOperandFlagOption => operandFlagOption === otherOperandFlagOption).length]) )));
    }
}

const freezeOperandsFlagsOptionStrings = (operandFlagOptionStrings: CliofoPrefixStrings | Readonly<CliofoPrefixStrings>): Readonly<CliofoPrefixStrings> =>
    Object.isFrozen(operandFlagOptionStrings) ? operandFlagOptionStrings
    : Object.freeze(new CliofoPrefixStrings(operandFlagOptionStrings.prefixString, operandFlagOptionStrings.arguments));

export {CliofoPrefixCount as default};
