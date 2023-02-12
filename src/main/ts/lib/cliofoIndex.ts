import {CliofoPrefixStrings} from "./cliofoPrefixStrings.js";

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
export class CliofoIndex
{
    public readonly operandFlagOptionStrings: Readonly<CliofoPrefixStrings>;

    /**
     * A map containing the operand strings as keys paired up with their
     * argument index as its value. The "argument index" is the index `number`
     * of which `string` argument it is. For instance, the following string
     * would be
     * @readonly
     */
    public readonly operandIndexes: ReadonlyMap<string, number>;

    public constructor(operandFlagOptionStrings: Readonly<CliofoPrefixStrings>)
    {
        this.operandFlagOptionStrings = Object.isFrozen(operandFlagOptionStrings)
            ? operandFlagOptionStrings
            : Object.freeze(new CliofoPrefixStrings(operandFlagOptionStrings.prefixString,
                                                  operandFlagOptionStrings.arguments));

        this.operandIndexes = new Map();
    }
}

export {CliofoIndex as default};
