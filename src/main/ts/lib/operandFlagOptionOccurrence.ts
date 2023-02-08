import {OperandsFlagsOptions} from "./operandsFlagsOptions.js";

export class OperandFlagOptionOccurrenceCount
{
    readonly #operandsFlagsOptions: Readonly<OperandsFlagsOptions>;
    readonly #operandsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #flagsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #optionsOccurrenceCountMap: ReadonlyMap<string, number>;

    public constructor(operandsFlagsOptions: Readonly<OperandsFlagsOptions>)
    {
        this.#operandsFlagsOptions = Object.isFrozen(operandsFlagsOptions) ? operandsFlagsOptions
            : Object.freeze(OperandsFlagsOptions.copy(operandsFlagsOptions));

        this.#operandsOccurrenceCountMap = Object.freeze(new Map(this.#operandsFlagsOptions.distinct().operands
            .map((operandString: string, index: number, operandStrings: readonly string[]) =>
                Object.freeze([operandString, operandStrings.filter(otherOperandString => operandString === otherOperandString).length]))));

        this.#flagsOccurrenceCountMap = Object.freeze(new Map(this.#operandsFlagsOptions.distinct().flags
            .map((flagString: string, index: number, flagStrings: readonly string[]) =>
                Object.freeze([flagString, flagStrings.filter(otherFlagString => flagString === otherFlagString).length]))));

        this.#optionsOccurrenceCountMap = Object.freeze(new Map(this.#operandsFlagsOptions.distinct().options
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
    public prefixParser(): Readonly<OperandsFlagsOptions> {return this.#operandsFlagsOptions;}

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
