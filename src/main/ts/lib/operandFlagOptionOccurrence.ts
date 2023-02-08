import {PrefixParser} from "./prefixParser.js";

export class OperandFlagOptionOccurrenceCount
{
    readonly #operandsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #flagsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #optionsOccurrenceCountMap: ReadonlyMap<string, number>;

    public constructor(prefixParser: Readonly<PrefixParser>)
    {
        this.#operandsOccurrenceCountMap = Object.freeze(new Map(prefixParser.distinct().operands()
            .map((operandString: string, index: number, operandStrings: readonly string[]) =>
                Object.freeze([operandString, operandStrings.filter(otherOperandString => operandString === otherOperandString).length]))));

        this.#flagsOccurrenceCountMap = Object.freeze(new Map(prefixParser.distinct().flags()
            .map((flagString: string, index: number, flagStrings: readonly string[]) =>
                Object.freeze([flagString, flagStrings.filter(otherFlagString => flagString === otherFlagString).length]))));

        this.#optionsOccurrenceCountMap = Object.freeze(new Map(prefixParser.distinct().options()
            .map((optionString: string, index: number, optionStrings: readonly string[]) =>
                Object.freeze([optionString, optionStrings.filter(otherOptionString => optionString === otherOptionString).length]))));
    }

    public operandsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#operandsOccurrenceCountMap;}
    public flagsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#flagsOccurrenceCountMap;}
    public optionsOccurrenceCountMap(): ReadonlyMap<string, number> {return this.#optionsOccurrenceCountMap;}
}
