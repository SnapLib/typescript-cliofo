import {PrefixParser} from "./cliofo-prefix-parser.js";

/**
 * This object uses a specified prefix `string` to parse strings into operands,
 * flags, and options and then get the indexes they occur at in a provided
 * `string` array.
 *
 * @example
 * Below is an example of how this object sorts the strings of a string array
 * into operands, flags, and options and then maps each one to the number of
 * times they are present in the string array:
 * ```typescript
 * const cliofoIndexes = new CliofoIndexes("-", ["-foox", "bar", "--baz", "-a", "-xyz", "--baz", "meep", "--yeet"]);
 *
 * // Creates a CliofoIndexes object with the following properties:
 * {
 *   prefixString: '-',
 *   arguments: [ '-foox', 'bar', '--baz', '-a', '-xyz',  '--baz', 'meep',  '--yeet' ],
 *   operand: Map(2) { 'bar' => [ 1 ], 'meep' => [ 6 ] },
 *   flag: Map(3) { '-foox' => [ 0 ], '-a' => [ 3 ], '-xyz' => [ 4 ] },
 *   option: Map(2) { 'baz' => [ 2, 5 ], 'yeet' => [ 7 ] }
 * }
 *
 * ```
 *
 * @remarks This class attempts to be as immutable as possible.
 *
 * @see {@link PrefixParser}
 */
export class Indexes extends PrefixParser<ReadonlyMap<string, readonly number[]>>
{
    /**
     * A map containing the operand strings as keys paired up with their
     * argument index as its value. The "argument index" is the index `number`
     * of which `string` argument it is.
     *
     * In the following line, `$myscript.js -la --color ./a/directory`, the
     * string `"./a/directory"` is an operand that is at argument index 2 (it's
     * the 3rd argument passed to the script `myscript.js`).
     *
     * @public
     * @override
     * @readonly
     */
    public readonly operand: ReadonlyMap<string, readonly number[]>;

    /**
     * A map containing the flag strings as keys paired up with their
     * argument index as its value. The "argument index" is the index `number`
     * of which `string` argument it is.
     *
     * In the following line, `$myscript.js -la --color ./a/directory`, the
     * string `"-la"` contains the flags that are at argument index 0 (they're
     * in the 1st argument passed to the script `myscript.js`).
     *
     * @public
     * @override
     * @readonly
     */
    public readonly flag: ReadonlyMap<string, readonly number[]>;

    /**
     * A map containing the option strings as keys paired up with their
     * argument index as its value. The "argument index" is the index `number`
     * of which `string` argument it is.
     *
     * In the following line, `$myscript.js -la --color ./a/directory`, the
     * string `"color"` is an operand that is at argument index 1 (it's the 2nd
     * argument passed to the script `myscript.js`).
     *
     * @public
     * @override
     * @readonly
     */
    public readonly option: ReadonlyMap<string, readonly number[]>;

    /**
     * Constructs an instance of an object that parses `string` arguments into
     * operands, flags, and options based on a leading prefix `string`.
     *
     * @param prefixString The prefix `string` used to denote which strings are
     *                     flags or options (or operands).
     *
     * @param strings The strings to parse to operands, flags, and options.
     *
     * @public
     * @constructor
     */
    public constructor(prefixString: string, strings: readonly string[])
    {
        super(prefixString, strings);

        this.operand = this.arguments
            .reduce( ( operandIndexesMap: ReadonlyMap<string, readonly number[]>,
                       aString: string,
                       index: number ) =>
            {
                return this.prefixString.length === 0 || ! aString.startsWith(this.prefixString)
                    ? Object.freeze(
                        new Map([...operandIndexesMap.entries()]
                            .map(operandEntry => operandEntry[0] === aString
                                ? [operandEntry[0], Object.freeze([...operandEntry[1], index])]
                                : operandEntry)))
                    : operandIndexesMap;
            },
            // Initialize frozen map of flag string keys mapped to empty number arrays as keys
            Object.freeze(
                new Map<string, readonly number[]>(
                    [...new Set(this.arguments.filter(aString => this.prefixString.length === 0 || ! aString.startsWith(this.prefixString)))].map(operandStr => Object.freeze([operandStr, Object.freeze([])])))));

        this.flag = this.arguments
            .reduce((flagIndexesMap: ReadonlyMap<string, readonly number[]>, aString: string, index: number) =>
            {
                return this.prefixString.length !== 0
                    && aString.startsWith(this.prefixString)
                    && ! aString.startsWith(this.optionPrefixString())
                        ? Object.freeze(
                            new Map([...flagIndexesMap.entries()]
                                .map(flagEntry => aString.includes(flagEntry[0])
                                    ? [flagEntry[0], Object.freeze([...flagEntry[1], index])]
                                    : flagEntry)))
                        : flagIndexesMap;
            },
            // Initialize frozen map of flag string keys mapped to empty number arrays as keys
            Object.freeze(
                new Map<string, readonly number[]>( [
                    ...new Set(this.arguments
                        .filter(aString => this.prefixString.length !== 0
                                && aString.startsWith(this.prefixString)
                                && ! aString.startsWith(this.optionPrefixString()))
                        .flatMap(aString => [...new Set(aString.slice(this.prefixString.length))])
                        .reduce((charSet, aChar) =>
                        {
                            return Object.freeze(new Set([...charSet, aChar]));
                        },
                        Object.freeze(new Set<string>()))
                    )
                ].map(flagStr => Object.freeze([flagStr, []])))
            ));

        this.option = this.arguments
            .reduce((optionIndexesMap: ReadonlyMap<string, readonly number[]>, aString: string, index: number) => {
                return this.prefixString.length !== 0 && aString.startsWith(this.optionPrefixString())
                    ? Object.freeze(new Map(
                        [...optionIndexesMap.entries()].map(optionEntry =>
                            optionEntry[0] === aString.slice(2)
                                ? [optionEntry[0], Object.freeze([...optionEntry[1], index])]
                                : optionEntry)))
                    : optionIndexesMap;
            },
            // Initialize frozen map of operand string keys mapped to empty number arrays as keys
            Object.freeze(new Map<string, readonly number[]>([...new Set(this.arguments.filter(aString => this.prefixString.length !== 0 && aString.startsWith(this.optionPrefixString())))].map(optionStr => Object.freeze([optionStr.slice(this.optionPrefixString().length), []])))));
    }
}

export {Indexes as default};
