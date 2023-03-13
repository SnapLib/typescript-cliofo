/**
 * A container for sorted parsed Cliofo output into a `readonly string[]`,
 * `ReadonlyMap<string, number>`, and `ReadonlyMap<string, readonly number[]>`
 */
export interface StringsCountsIndexes
{
    /**
     * The parsed Cliofo operand, flag, or option strings.
     * @public
     * @readonly
     */
    readonly strings: readonly string[]

    /**
     * The parsed Cliofo operand, flag, or option counts. This is the number of
     * occurrences of each operand, flag, or option accessible via a map.
     * @public
     * @readonly
     */
    readonly counts: ReadonlyMap<string, number>

    /**
     * The parsed Cliofo operand, flag, or option indexes. This is the index or
     * indexes of the string argument that is or contains each passed operand,
     * flag, or option.
     * @public
     * @readonly
     */
    readonly indexes: ReadonlyMap<string, readonly number[]>
}

export {StringsCountsIndexes as default};
