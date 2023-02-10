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
    /**
     * A readonly `string` array of this operands.
     * @readonly
     */
    public readonly operands: readonly string[];

    /**
     * A readonly `string` array of flags.
     * @readonly
     */
    public readonly flags: readonly string[];

    /**
     * A readonly `string` array of options.
     * @readonly
     */
    public readonly options: readonly string[];

    /**
     * A readonly `string` array of operands, flags, and options.
     * @readonly
     */
    public readonly all: readonly string[];

    readonly #distinct: Readonly<DistinctOperandsFlagsOptions>;

    public static readonly empty: Readonly<OperandsFlagsOptions> =
        Object.freeze(new OperandsFlagsOptions(Object.freeze([]), Object.freeze([]), Object.freeze([])));

    protected constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this.operands = Object.isFrozen(operands) ? operands : Object.freeze([...operands]);
        this.flags = Object.isFrozen(flags) ? flags : Object.freeze([...flags]);
        this.options = Object.isFrozen(options) ? options : Object.freeze([...options]);
        this.all = Object.freeze([...this.operands, ...this.flags, ...this.options]);
        this.#distinct = Object.freeze({
            options: Object.freeze([...new Set(this.options)]),
            operands: Object.freeze([...new Set(this.operands)]),
            flags: Object.freeze([...new Set(this.flags)]),
            all: Object.freeze([...new Set(this.all)])
        });
    }

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
        return new OperandsFlagsOptions(operandsFlagsOptions.operands,
                                        operandsFlagsOptions.flags,
                                        operandsFlagsOptions.options);
    }
}

export {OperandsFlagsOptions as default};
