/**
 * Root class of the *Cliofo* argument prefix parser classes contained within
 * this package. This class contains the properties for a `string` prefix and a
 * `string[]` of arguments to parse to operands, flags, and options. The classes
 * that inherit from this class then implement how the `string` arguments are
 * parsed and what types they're parsed in to (via this class' type parameter).
 *
 * Below is an explanation of how this abstract class is implemented by other
 * classes in this package:
 *
 * 1. If a `string` isn't prefixed with a leading prefix `string` or the leading
 *    prefix `string` is empty (`""`), then the `string` is interpreted as an
 *    *operand*.
 *
 * 1. If a `string` is prefixed with only a single leading prefix `string`, then
 *    the `string` is interpreted as a *flag*.
 *
 * 1. If a `string` is prefixed with a sequence of 2 or more adjacent leading
 *    prefix strings, then it's interpreted as an *option*.
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
 * @remarks This class attempts to be as immutable as possible.
 *
 * @typeParam ParsedStringsT - the type strings are parsed to as operands,
 *                             flags, and options.
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

    readonly #optionPrefixString: string;

    readonly #isEmpty: boolean;

    /**
     * Creates a new {@link PrefixParser} object instance by copying the
     * properties of another.
     *
     * @param other {@link PrefixParser} object instance to copy.
     *
     * @protected
     * @constructor
     */
    protected constructor(other: Readonly<PrefixParser<ParsedStringsT>>);
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
    protected constructor(prefixString: string, strings: readonly string[]);
    protected constructor(otherOrPrefixString: string | Readonly<PrefixParser<ParsedStringsT>>, strings?: readonly string[])
    {
        if (typeof otherOrPrefixString === "string" && strings)
        {
            this.prefixString = otherOrPrefixString;
            this.#optionPrefixString = this.prefixString.repeat(2);
            this.arguments = Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
            this.#isEmpty = this.arguments.length === 0;
        }
        else if (otherOrPrefixString instanceof PrefixParser<ParsedStringsT>)
        {
            this.prefixString = otherOrPrefixString.prefixString;
            this.arguments = otherOrPrefixString.arguments;
            this.#isEmpty = otherOrPrefixString.#isEmpty;
            this.#optionPrefixString = otherOrPrefixString.#optionPrefixString;
        }
        else
        {
            throw new Error();
        }
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
