export class OperandsFlagsOptions
{
    protected readonly _all: readonly string[];
    protected readonly _operands: readonly string[];
    protected readonly _flags: readonly string[];
    protected readonly _options: readonly string[];

    protected constructor(operands: readonly string[], flags: readonly string[], options: readonly string[])
    {
        this._all = Object.freeze([...operands, ...flags, ...options]);
        this._operands = operands;
        this._flags = flags;
        this._options = options;
    }

    public all(): readonly string[] {return this._all;}
    public operands(): readonly string[] {return this._operands;}
    public flags(): readonly string[] {return this._flags;}
    public options(): readonly string[] {return this._options;}
}
