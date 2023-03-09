/**
 * Root class of the *Cliofo* argument prefix parser classes contained within
 * this package. This class contains the properties for a `string` prefix and a
 * `string[]` of arguments to parse to operand, flag, and option properties. The
 * classes that inherit from this class then implement how the `string`
 * arguments are parsed and what types they're parsed to (via this class' type
 * parameter).
 *
 * Below is an explanation of how this abstract class is implemented by other
 * classes in this package. Implementations aren't limited to this:
 *
 * 1. If a `string` isn't prefixed with a leading prefix `string` or the leading
 *    prefix `string` is empty, then the `string` is an *operand*.
 *
 * 1. If a `string` is prefixed with only a single leading prefix `string`, then
 *    the `string` is a *flag*.
 *
 * 1. If a `string` is prefixed with 2 or more leading prefix `string`s, then
 *    it's an *option*.
 *
 * The flag and option strings do not include the 1 or 2 leading prefix strings
 * they were prefixed with to denote them as a flag or option. For example, the
 * leading hyphen characters (`"-"` and `"--"`) in the strings `"-foo"` and
 * `"--bar"` would be ignored if the prefix string is a hyphen character(`"-"`).
 *
 * All flag strings are parsed down to their individual characters. For example
 * the string `"-foo"` would be stored as the characters `["f", "o", "o"]` if
 * the leading hyphen character (`"-"`) is the prefix string.
 *
 * If the leading prefix string is an empty string (`""`) then all string
 * arguments are considered operands.
 *
 * @remarks This class attempts to be as immutable as possible.
 *
 * @typeParam ParsedStringT - the type strings are parsed to as operands, flags,
 *                            and options.
 *
 * @abstract
 */
export abstract class PrefixParser<ParsedStringsT>
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
    public abstract readonly operand: ParsedStringsT;

    /**
     * Property to contain strings parsed to flags.
     *
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly flag: ParsedStringsT;

    /**
     * Property to contain strings parsed to options.
     *
     * @public
     * @abstract
     * @readonly
     */
    public abstract readonly option: ParsedStringsT;

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
     * @constructor
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

export {PrefixParser as default};
