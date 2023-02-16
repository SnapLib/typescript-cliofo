import {CliofoPrefixParser} from "./cliofoPrefixParser.js";
import {CliofoStrings} from "./cliofoStrings.js";

/**
 * @classdesc
 * Contains the *argument indexes* of each operand, flag, and option. The
 * "argument index" is the index `number` of an argument's position relative to
 * any other arguments it's passed with.
 *
 * @example
 * Below is an example of some string argument indexes and how this class can
 * be used.
 * ```javascript
 * const prefixParser = new PrefixParser("-", ["--first" "-two", "--foo", "three", "-xyz" "bar"]);
 * const cliofoIndex = new CliofoIndex(prefixParser);
 *
 * console.log(cliofoIndex);
 * // prints:
 * // {
 * //   operands: Map()
 * //
 * // }
 * ```
 */
export class CliofoIndexes extends CliofoPrefixParser
{
    /**
     * A map containing the operand strings as keys paired up with their
     * argument index as its value. The "argument index" is the index `number`
     * of which `string` argument it is. For instance, the following string
     * would be
     * @readonly
     */
    public readonly operandIndexes: ReadonlyMap<string, readonly number[]>;

    public readonly flagIndexes: ReadonlyMap<string, readonly number[]>;

    public readonly optionIndexes: ReadonlyMap<string, readonly number[]>;

    readonly #jsonObj: Readonly<{
        operandIndexes: ReadonlyMap<string, readonly number[]>,
        flagIndexes: ReadonlyMap<string, readonly number[]>,
        optionIndexes: ReadonlyMap<string, readonly number[]>
    }>;

    public constructor(prefixString: string, args: readonly string[])
    {
        super(prefixString, args);
        const cliofoStrings: Readonly<CliofoStrings> = Object.freeze(new CliofoStrings(prefixString, args));

        this.operandIndexes = cliofoStrings.arguments
            .reduce((operandIndexesMap: ReadonlyMap<string, readonly number[]>, stringArg: string, index: number) => {
                return prefixString.length === 0 || ! stringArg.startsWith(prefixString) ? Object.freeze(new Map([...operandIndexesMap.entries()].map(operandEntry => operandEntry[0] === stringArg ? [operandEntry[0], Object.freeze([...operandEntry[1], index])] : operandEntry))) : operandIndexesMap;
            },
            // Initialize frozen map of flag string keys mapped to empty number arrays as keys
            Object.freeze(new Map<string, readonly number[]>([...new Set(cliofoStrings.operandStrings)].map(operandStr => Object.freeze([operandStr, []])))));

        this.flagIndexes = cliofoStrings.arguments
            .reduce((flagIndexesMap: ReadonlyMap<string, readonly number[]>, stringArg: string, index: number) => {
                return prefixString.length !== 0 && stringArg.startsWith(prefixString) && ! stringArg.startsWith(prefixString.repeat(2)) ? Object.freeze(new Map([...flagIndexesMap.entries()].map(flagEntry => stringArg.includes(flagEntry[0]) ? [flagEntry[0], Object.freeze([...flagEntry[1], index])] : flagEntry))) : flagIndexesMap;
            },
            // Initialize frozen map of flag string keys mapped to empty number arrays as keys
            Object.freeze(new Map<string, readonly number[]>([...new Set(cliofoStrings.flagStrings)].map(flagStr => Object.freeze([flagStr, []])))));

        this.optionIndexes = cliofoStrings.arguments
        .reduce((optionIndexesMap: ReadonlyMap<string, readonly number[]>, stringArg: string, index: number) => {
            return prefixString.length !== 0 && stringArg.startsWith(prefixString.repeat(2)) ? Object.freeze(new Map([...optionIndexesMap.entries()].map(optionEntry => optionEntry[0] === stringArg.slice(2) ? [optionEntry[0], Object.freeze([...optionEntry[1], index])] : optionEntry))) : optionIndexesMap;
        },
        // Initialize frozen map of operand string keys mapped to empty number arrays as keys
        Object.freeze(new Map<string, readonly number[]>([...new Set(cliofoStrings.optionStrings)].map(optionStr => Object.freeze([optionStr, []])))));

        this.#jsonObj = Object.freeze({
            operandIndexes: this.operandIndexes,
            flagIndexes: this.flagIndexes,
            optionIndexes: this.optionIndexes
        });
    }

    /**
     * Returns an object containing this object's {@link operandIndexes},
     * {@link flagIndexes}, and {@link optionIndexes} properties.
     *
     * @returns an object containing this object's {@link operandIndexes},
     * {@link flagIndexes}, and {@link optionIndexes} properties.
     */
    public jsonObj(): Readonly<{[_: string]: ReadonlyMap<string, readonly number[]>}> {return this.#jsonObj;}

    /**
     * Returns a  JSON string of this object's {@link operandIndexes},
     * {@link flagIndexes}, and {@link optionIndexes} properties.
     *
     * @param format Options to format the generated JSON string.
     *
     * @returns A JSON string of this object's {@link operandIndexes},
     * {@link flagIndexes}, and {@link optionIndexes} properties.
     */
    public jsonString(format: Partial<{
        replacer?: (this: unknown, key: string, value: unknown) => unknown | (string|number)[],
        space?: string | number
    }> = {}): string
    { return JSON.stringify(this.#jsonObj, format.replacer, format.space); }
}

export {CliofoIndexes as default};
