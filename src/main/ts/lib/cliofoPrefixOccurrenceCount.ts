import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";
import {PrefixParser, copyPrefixParser} from "./prefixParser.js";

export class CliofoPrefixOccurrenceCount extends OperandsFlagsOptions
{
    readonly #prefixParser: Readonly<PrefixParser>;
    readonly #operandsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #flagsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #optionsOccurrenceCountMap: ReadonlyMap<string, number>;

    public constructor(prefixParser: Readonly<PrefixParser>)
    {
        super(prefixParser.operands, prefixParser.flags, prefixParser.options);
        this.#prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(copyPrefixParser(prefixParser));

        this.#operandsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().operands
            .map((operandString: string) => Object.freeze(
                 [operandString, prefixParser.operands.filter(otherOperandString => operandString === otherOperandString).length] ))));

        this.#flagsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().flags
            .map((flagString: string) => Object.freeze(
                 [flagString, prefixParser.flags.filter(otherFlagString => flagString === otherFlagString).length] ))));

        this.#optionsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().options
            .map((optionString: string) => Object.freeze(
                 [optionString, prefixParser.options.filter(otherOptionString => optionString === otherOptionString).length] ))));
    }

    /**
     * Returns this object's `PrefixParser` it counted the operands, flags, and
     * options of.
     *
     * @returns this object's `PrefixParser` it counted the operands, flags, and
     *          options of.
     */
    public prefixParser(): Readonly<PrefixParser> {return this.#prefixParser;}

    /**
     * Returns a map containing the operand strings as keys and the number of
     * times each one occurs as its value.
     *
     * @returns A map containing the operand strings as keys and the number of
     *          times each one occurs as its value.
     */
    public operandsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#operandsOccurrenceCountMap;}

    /**
     * Returns a map containing the flag strings as keys and the number of times
     * each one occurs as its value.
     *
     * @returns A map containing the flags as keys and the number of times each
     *          one occurs as its value.
     */
    public flagsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#flagsOccurrenceCountMap;}

    /**
     * Returns a map containing the option strings as keys and the number of
     * times each one occurs as its value.
     *
     * @returns A map containing the option strings as keys and the number of
     *          times each one occurs as its value.
     */
    public optionsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#optionsOccurrenceCountMap;}
}

export {CliofoPrefixOccurrenceCount as default};
