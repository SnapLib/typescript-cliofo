import {CliofoPrefixParse} from "./cliofoPrefixParse.js";

export class CliofoPrefixCount
{
    public readonly prefixParser: Readonly<CliofoPrefixParse>;

    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly operandsCountMap: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly flagsCountMap: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly optionsCountMap: ReadonlyMap<string, number>;

    public readonly allCountMap: ReadonlyMap<string, number>;

    public constructor(operandFlagOptionStrings: Readonly<CliofoPrefixParse>)
    {
        this.prefixParser = freezeOperandsFlagsOptionStrings(operandFlagOptionStrings);

        this.operandsCountMap = Object.freeze(new Map([...new Set(this.prefixParser.operands)].map(operandString => Object.freeze(
            [operandString, operandFlagOptionStrings.operands.filter(otherOperandString => operandString === otherOperandString).length]) )));

        this.flagsCountMap = Object.freeze(new Map([...new Set(this.prefixParser.flags)].map(flagString => Object.freeze(
            [flagString, operandFlagOptionStrings.flags.filter(otherFlagString => flagString === otherFlagString).length]) )));

        this.optionsCountMap = Object.freeze(new Map([...new Set(this.prefixParser.options)].map(optionString => Object.freeze(
            [optionString, operandFlagOptionStrings.options.filter(otherOptionString => optionString === otherOptionString).length]) )));

        this.allCountMap = Object.freeze(new Map([...new Set(this.prefixParser.all)].map(operandFlagOption => Object.freeze(
            [ operandFlagOption,
              this.prefixParser.all.filter(otherOperandFlagOption => operandFlagOption === otherOperandFlagOption).length]) )));
    }
}

const freezeOperandsFlagsOptionStrings = (operandFlagOptionStrings: CliofoPrefixParse | Readonly<CliofoPrefixParse>): Readonly<CliofoPrefixParse> =>
    Object.isFrozen(operandFlagOptionStrings) ? operandFlagOptionStrings
    : Object.freeze(new CliofoPrefixParse(operandFlagOptionStrings.prefixString, operandFlagOptionStrings.arguments));

export {CliofoPrefixCount as default};
