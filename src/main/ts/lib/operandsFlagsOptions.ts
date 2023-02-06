/**
 * A container for string arrays intended to be used for strings parsed to
 * operands, flags, and flags.
 */
export class OperandsFlagsOptions
{
    protected readonly _all: readonly string[];
    protected readonly _operands: readonly string[];
    protected readonly _flags: readonly string[];
    protected readonly _options: readonly string[];

    public static readonly empty: Readonly<OperandsFlagsOptions> =
        Object.freeze(new OperandsFlagsOptions(Object.freeze([]), Object.freeze([]), Object.freeze([])));

    protected constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this._all = Object.freeze([...operands, ...flags, ...options]);
        this._operands = Object.isFrozen(operands) ? operands : Object.freeze([...operands]);
        this._flags = Object.isFrozen(flags) ? flags : Object.freeze([...flags]);
        this._options = Object.isFrozen(options) ? options : Object.freeze([...options]);
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
}
