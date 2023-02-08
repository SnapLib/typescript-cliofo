import {PrefixParser} from "./prefixParser.js";

export class OperandFlagOptionOccurrenceCount
{
    readonly #prefixParser: Readonly<PrefixParser>;
    readonly #operandsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #flagsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #optionsOccurrenceCountMap: ReadonlyMap<string, number>;

    public constructor(prefixParser: Readonly<PrefixParser>)
    {
        this.#prefixParser = Object.isFrozen(prefixParser) ? prefixParser
            : Object.freeze(new PrefixParser(prefixParser.prefixString(), prefixParser.strings()));
        this.#operandsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().operands()
            .map((operandString: string, index: number, operandStrings: readonly string[]) =>
                Object.freeze([operandString, operandStrings.filter(otherOperandString => operandString === otherOperandString).length]))));

        this.#flagsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().flags()
            .map((flagString: string, index: number, flagStrings: readonly string[]) =>
                Object.freeze([flagString, flagStrings.filter(otherFlagString => flagString === otherFlagString).length]))));

        this.#optionsOccurrenceCountMap = Object.freeze(new Map(this.#prefixParser.distinct().options()
            .map((optionString: string, index: number, optionStrings: readonly string[]) =>
                Object.freeze([optionString, optionStrings.filter(otherOptionString => optionString === otherOptionString).length]))));
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

    public toString(): string
    {
        return `${OperandFlagOptionOccurrenceCount.name}{operands: {${""}}}`;
    }
}
