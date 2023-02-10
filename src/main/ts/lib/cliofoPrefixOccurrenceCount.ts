import {PrefixParser, copyPrefixParser} from "./prefixParser.js";

export class CliofoPrefixOccurrenceCount
{
    readonly #prefixParser: Readonly<PrefixParser>;
    readonly #operandsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #flagsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #optionsOccurrenceCountMap: ReadonlyMap<string, number>;
    readonly #jsonObj: Readonly<{[_: string]: ReadonlyMap<string, number>}>;

    public constructor(prefixParser: Readonly<PrefixParser>)
    {
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

        this.#jsonObj = Object.freeze({
            operands: this.#operandsOccurrenceCountMap,
            flags: this.#flagsOccurrenceCountMap,
            options: this.#optionsOccurrenceCountMap
        });
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

    /**
     * Returns the JSON string representation of this object.
     *
     * @remarks The `format.replacer` and `format.space` parameters are passed
     *          to the `JSON.stringify(...)` method that's called internally.
     *          Below are the doc comments directly from the
     *          {@link JSON.stringify()} `replacer` and `space` parameters.
     *
     * @param stringFormat
     * Various options used to format the json string output of this method. The
     * following format options are:
     *
     * - `replacer`
     *   A function that alters the behavior of the stringification process, or
     *   an array of strings and numbers that specifies properties of value to
     *   be included in the output. If replacer is an array, all elements in
     *   this array that are not strings or numbers (either primitives or
     *   wrapper objects), including Symbol values, are completely ignored. If
     *   replacer is anything other than a function or an array (e.g. null or
     *   not provided), all string-keyed properties of the object are included
     *   in the resulting JSON string.
     *
     * - `space`
     *   A `string` or `number` that's used to insert white space (including
     *   indentation, line break characters, etc.) into the output JSON string
     *   for readability purposes. If this is a number, it indicates the number
     *   of space characters to be used as indentation, clamped to 10 (that is,
     *   any number greater than 10 is treated as if it were 10). Values less
     *   than 1 indicate that no space should be used. If this is a string, the
     *   string (or the first 10 characters of the string, if it's longer than
     *   that) is inserted before every nested object or array.
     *
     * @returns the JSON string representation of this object.
     */
    public toJSON(format: Partial<{replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        return JSON.stringify(this.#jsonObj, format.replacer, format.space);
    }
}

export {CliofoPrefixOccurrenceCount as default};
