/**
 * Root class of the *Cliofo* argument prefix parser classes contained within
 * this package. This class contains the properties for a `string` prefix and a
 * `string[]` of arguments to parse to operand, flag, and option properties. The
 * classes that inherit from this class then implement how the `string`
 * arguments are parsed and what types they're parsed to (via this class' type
 * parameter).
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
     * Property to contain strings parsed to operands.
     *
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly operand: ParsedStringT;

    /**
     * Property to contain strings parsed to flags.
     *
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly flag: ParsedStringT;

    /**
     * Property to contain strings parsed to options.
     *
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly option: ParsedStringT;

    readonly #isEmpty: boolean;

    /**
     * Constructs an instance of an object that parses `string` arguments into
     * operands, flags, and options based on a leading prefix `string`.
     *
     * @param prefixString The prefix `string` used to denote which strings are
     *                     flags or options (or operands).
     *
     * @param strings The strings to parse to operands, flags, and options.
     *
     * @protected
     */
    protected constructor(prefixString: string, strings: readonly string[])
    {
        this.prefixString = prefixString;
        this.#optionPrefixString = this.prefixString.repeat(2);
        this.arguments = Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
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
