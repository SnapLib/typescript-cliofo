/**
 * Root class of the Cliofo argument prefix parser classes contained within this
 * package. This package only contains the properties for a `string` prefix and
 * `string[]` of arguments. The classes that inherit from this class then
 * implement how the prefix `string` is used to parse the strings of the
 * `string[]` arguments.
 *
 * @remarks This class attempts to be as immutable as possible.
 *
 * @typeParam ParsedStringT - the type strings are parsed to as operands, flags,
 *                            and options.
 *
 * @abstract
 */
export abstract class CliofoPrefixParser<ParsedStringT>
{
    /**
     * The leading prefix `string` used to denote which arguments are flags and
     * options.
     *
     * @public
     * @readonly
     */
    public readonly prefixString: string;

    readonly #optionPrefixString: string;

    /**
     * The strings to parse using this object's {@link prefixString}.
     *
     * @public
     * @readonly
     */
    public readonly arguments: readonly string[];

    /**
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly operand: ParsedStringT;

    /**
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly option: ParsedStringT;

    /**
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly flag: ParsedStringT;

    readonly #isEmpty: boolean;

    protected constructor(prefixString: string, args: readonly string[])
    {
        this.prefixString = prefixString;
        this.#optionPrefixString = this.prefixString.repeat(2);
        this.arguments = Object.isFrozen(args) ? args : Object.freeze([...args]);
        this.#isEmpty = this.arguments.length === 0;
    }

    /**
     * Returns `true` if this object contains 0 strings to parse.
     *
     * @returns `true` if this object contains 0 strings to parse.
     *
     * @public
     */
    public IsEmpty(): boolean {return this.#isEmpty;}

    /**
     * The prefix string used to denote option strings. This is derived from
     * doubling the prefix string of this object.
     *
     * @returns The prefix string used to denote option strings.
     *
     * @public
     */
    public optionPrefixString(): string {return this.#optionPrefixString;}
}

export {CliofoPrefixParser as default};
