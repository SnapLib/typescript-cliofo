import {CliofoPrefixParse, copyPrefixParser} from "./cliofoPrefixParse.js";

export class CliofoPrefixOccurrenceCount
{
    public readonly prefixParser: Readonly<CliofoPrefixParse>;

    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly operandsOccurrenceCountMap: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly flagsOccurrenceCountMap: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly optionsOccurrenceCountMap: ReadonlyMap<string, number>;

    public constructor(prefixParser: Readonly<CliofoPrefixParse>)
    {
        this.prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(copyPrefixParser(prefixParser));

        this.operandsOccurrenceCountMap = Object.freeze(new Map(Object.freeze([...new Set(this.prefixParser.operands)]).map((operandString: string) => Object.freeze(
            [operandString, prefixParser.operands.filter(otherOperandString => operandString === otherOperandString).length] ))));

        this.flagsOccurrenceCountMap = Object.freeze(new Map(Object.freeze([...new Set(this.prefixParser.flags)]).map((flagString: string) => Object.freeze(
            [flagString, prefixParser.flags.filter(otherFlagString => flagString === otherFlagString).length] ))));

        this.optionsOccurrenceCountMap = Object.freeze(new Map(Object.freeze([...new Set(this.prefixParser.options)]).map((optionString: string) => Object.freeze(
            [optionString, prefixParser.options.filter(otherOptionString => optionString === otherOptionString).length] ))));
    }
}

export {CliofoPrefixOccurrenceCount as default};
