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

    public static readonly empty: Readonly<OperandsFlagsOptions> =
        Object.freeze(new OperandsFlagsOptions(Object.freeze([]), Object.freeze([]), Object.freeze([])));

    protected constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this.operands = Object.isFrozen(operands) ? operands : Object.freeze([...operands]);
        this.flags = Object.isFrozen(flags) ? flags : Object.freeze([...flags]);
        this.options = Object.isFrozen(options) ? options : Object.freeze([...options]);
        this.all = Object.freeze([...this.operands, ...this.flags, ...this.options]);
    }
}

export {OperandsFlagsOptions as default};
