import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";
import {PrefixParser, copyPrefixParser} from "./prefixParser.js";

export class CliofoPrefixOccurrenceCount extends OperandsFlagsOptions
{
    public readonly prefixParser: Readonly<PrefixParser>;

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

    public constructor(prefixParser: Readonly<PrefixParser>)
    {
        super(prefixParser.operands, prefixParser.flags, prefixParser.options);
        this.prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(copyPrefixParser(prefixParser));

        const operandKeys: readonly string[] = Object.freeze([...new Set(this.operands)]);
        const FlagKeys: readonly string[] = Object.freeze([...new Set(this.flags)]);
        const optionKeys: readonly string[] = Object.freeze([...new Set(this.options)]);

        this.operandsOccurrenceCountMap = Object.freeze(new Map(operandKeys.map((operandString: string) => Object.freeze(
            [operandString, prefixParser.operands.filter(otherOperandString => operandString === otherOperandString).length] ))));

        this.flagsOccurrenceCountMap = Object.freeze(new Map(FlagKeys.map((flagString: string) => Object.freeze(
            [flagString, prefixParser.flags.filter(otherFlagString => flagString === otherFlagString).length] ))));

        this.optionsOccurrenceCountMap = Object.freeze(new Map(optionKeys.map((optionString: string) => Object.freeze(
            [optionString, prefixParser.options.filter(otherOptionString => optionString === otherOptionString).length] ))));
    }
}

export {CliofoPrefixOccurrenceCount as default};
