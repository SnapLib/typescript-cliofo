interface DistinctOperandsFlagsOptions
{
    readonly all: readonly string[],
    readonly operands: readonly string[],
    readonly flags: readonly string[],
    readonly options: readonly string[]
}

/**
 * A container for string arrays intended to be used for strings parsed to
 * operands, flags, and options.
 */
export class OperandsFlagsOptions
{
    protected readonly _all: readonly string[];
    protected readonly _operands: readonly string[];
    protected readonly _flags: readonly string[];
    protected readonly _options: readonly string[];
    readonly #distinct: Readonly<DistinctOperandsFlagsOptions>;

    public static readonly empty: Readonly<OperandsFlagsOptions> =
        Object.freeze(new OperandsFlagsOptions(Object.freeze([]), Object.freeze([]), Object.freeze([])));

    protected constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this._all = Object.freeze([...operands, ...flags, ...options]);
        this._operands = Object.isFrozen(operands) ? operands : Object.freeze([...operands]);
        this._flags = Object.isFrozen(flags) ? flags : Object.freeze([...flags]);
        this._options = Object.isFrozen(options) ? options : Object.freeze([...options]);
        this.#distinct = Object.freeze({
            all: Object.freeze([...new Set(this._all)]),
            operands: Object.freeze([...new Set(this._operands)]),
            flags: Object.freeze([...new Set(this._flags)]),
            options: Object.freeze([...new Set(this._options)])
        });
    }

    /**
     * Returns all of this objects operand, flag, and option strings combined
     * into a single array.
     *
     * @returns all of this objects operand, flag, and option strings combined
     *          into a single array.
     */
    public all(): readonly string[] {return this._all;}

    /**
     * Returns this object's operand strings as an array.
     *
     * @returns this object's operand strings as an array.
     */
    public operands(): readonly string[] {return this._operands;}

    /**
     * Returns this object's flag strings as an array.
     *
     * @returns this object's flag strings as an array.
     */
    public flags(): readonly string[] {return this._flags;}

    /**
     * Returns this object's option strings as an array.
     *
     * @returns this object's option strings as an array.
     */
    public options(): readonly string[] {return this._options;}

    /**
     * An object containing distinct copies of this object's parsed operands,
     * flags, and options.
     *
     * @returns An object containing distinct copies of this object's parsed
     *          operands, flags, and options.
     */
    public distinct(): Readonly<DistinctOperandsFlagsOptions> {return this.#distinct;}

    public static copy(operandsFlagsOptions: Readonly<OperandsFlagsOptions>): Readonly<OperandsFlagsOptions>
    {
        return new OperandsFlagsOptions(operandsFlagsOptions.operands(),
                                        operandsFlagsOptions.flags(),
                                        operandsFlagsOptions.options());
    }
}

export {OperandsFlagsOptions as default};
