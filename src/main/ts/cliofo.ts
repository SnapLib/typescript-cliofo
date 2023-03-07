import {CliofoCounts} from "./lib/parser/cliofo-counts.js";
import {CliofoStrings} from "./lib/parser/cliofo-strings.js";
import {CliofoIndexes} from "./lib/parser/cliofo-indexes.js";
import {CliofoPrefixParser} from "./lib/parser/cliofo-prefix-parser.js";

/**
 * The root entry point of the entire Cliofo package. Classes from this
 * package's library are used to parse strings into operands, flags, and options
 * based on a prefix string.
 *
 * @remarks This class doesn't directly parse/consume any string arguments.
 * Functions that parse/consume command line arguments and create
 * `Cliofo` objects are provided by this package instead such as {@link Cliofo}.
 */
export class Cliofo
{
    /**
     * The `string` to denote flags and options (and operands).
     *
     * @public
     * @readonly
     */
    public readonly prefixString: string;

    /**
     * The `string[]` of strings to parse with this object's
     * {@link prefixString} `string into operands, flags, and options.
     *
     * @public
     * @readonly
     */
    public readonly arguments: readonly string[];

    /**
     * The operand strings contained within this object's {@link arguments}
     * `string[]` when parsed with this object's {@link prefixString}. Strings
     * that don't start with this object's {@link prefixString} are operands.
     *
     * @public
     * @readonly
     */
    public readonly operand: Readonly<ParsedCliofoArgument>;

    /**
     * The flag character strings contained with this object's
     * {@link arguments} `string[]` when parsed with this object's
     * {@link prefixString} `string`. Strings that begin with only a single
     * leading instance of this object's {@link prefixString} are flags. The
     * characters of each flag string are stored as individual characters as
     * opposed to the entire string (unlike {@link operand} and {@link option}
     * strings which consist of the entire string argument).
     *
     * @public
     * @readonly
     */
    public readonly flag: Readonly<ParsedCliofoArgument>;

    /**
     * The option strings contained within this object's {@link arguments}
     * `string[]` when parsed with this object's {@link prefixString} `string`.
     * A `string` that starts with a sequence of 2 or more of this object's
     * {@link prefixString} strings is an operand.
     *
     * @public
     * @readonly
     */
    public readonly option: Readonly<ParsedCliofoArgument>;

    readonly #cliofoStrings: Readonly<CliofoStrings>;
    readonly #cliofoCounts: Readonly<CliofoCounts>;
    readonly #cliofoIndexes: Readonly<CliofoIndexes>;

    /**
     * Constructs a new instance of a {@link Cliofo} object from a
     * {@link CliofoPrefixParser} object.
     *
     * @param parsedCliofos The {@link CliofoPrefixParser} object to construct
     * the new {@link Cliofo} object instance from.
     */
    public constructor(parsedCliofos: CliofoPrefixParser<unknown>);

    /**
     * Constructs a new instance of a {@link Cliofo} object using the provided
     * `string` as the prefix `string` used to denote if a `string` is an
     * operand, flag, or option.
     *
     * @param prefixString The leading prefix `string` used to denote if a
     *   `string` is an operand, flag, or option.
     *
     * @param strings The strings to parse into operands, flags, and options
     *   based on the provided prefix `string`.
     */
    public constructor(prefixString: string, strings: string[]);
    constructor(prefixStringOrParsedCliofos: Readonly<CliofoPrefixParser<unknown>> | string, strings?: readonly string[])
    {
        if (typeof prefixStringOrParsedCliofos === "string")
        {
            this.prefixString = prefixStringOrParsedCliofos;
            this.arguments = strings === undefined || strings === null
                ? Object.freeze ([])
                : Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
            this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.arguments));
            this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.arguments));
            this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.arguments));
        }
        else if (prefixStringOrParsedCliofos instanceof CliofoPrefixParser<unknown>)
        {

            if (prefixStringOrParsedCliofos instanceof CliofoStrings)
            {
                this.#cliofoStrings =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new CliofoStrings(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoStrings.prefixString;
                this.arguments = this.#cliofoStrings.arguments;
                this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.arguments));
            }
            else if (prefixStringOrParsedCliofos instanceof CliofoCounts)
            {
                this.#cliofoCounts =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new CliofoCounts(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoCounts.prefixString;
                this.arguments = this.#cliofoCounts.arguments;
                this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.arguments));
            }
            else if (prefixStringOrParsedCliofos instanceof CliofoIndexes)
            {
                this.#cliofoIndexes =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new CliofoIndexes(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoIndexes.prefixString;
                this.arguments = this.#cliofoIndexes.arguments;
                this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.arguments));
                this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.arguments));
            }
            else
            {
                this.prefixString = prefixStringOrParsedCliofos.prefixString;
                this.arguments = Object.isFrozen(prefixStringOrParsedCliofos.arguments)
                    ? prefixStringOrParsedCliofos.arguments
                    : Object.freeze([...prefixStringOrParsedCliofos.arguments]);
                this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.arguments));
                this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.arguments));
            }
        }
        else
        {
            throw new Error(`could not parse "${prefixStringOrParsedCliofos}" and ${strings}`);
        }

        this.operand = Object.freeze({
            strings: this.#cliofoStrings.operand,
            counts: this.#cliofoCounts.operand,
            indexes: this.#cliofoIndexes.operand
        });

        this.flag = Object.freeze({
            strings: this.#cliofoStrings.flag,
            counts: this.#cliofoCounts.flag,
            indexes: this.#cliofoIndexes.flag
        });

        this.option = Object.freeze({
            strings: this.#cliofoStrings.option,
            counts: this.#cliofoCounts.option,
            indexes: this.#cliofoIndexes.option
        });

    }

    public cliofoStrings(): Readonly<CliofoStrings> {return this.#cliofoStrings;}

    public cliofoCounts(): Readonly<CliofoCounts> {return this.#cliofoCounts;}

    public cliofoIndexes(): Readonly<CliofoIndexes> {return this.#cliofoIndexes;}
}

/**
 * The passed `prefixString` string argument is used to parse the strings of the
 * passed `argumentStrings` string array.
 *
 * @remarks Returns a new {@link Cliofo} object constructed from the passed
 *          arguments.
 *
 * @param prefixString The leading prefix `string` used to denote which
 *                     arguments are flags and options.
 *
 * @param argumentStrings The strings to parse with the prefix string (provided
 *                        via the passed `prefixString` string argument).
 *
 * @returns a new {@link Cliofo} instance constructed with the provided
 *          `prefixString` and `argumentStrings` argument.
 */
export const parseStrings = (prefixString: string, argumentStrings: readonly string[]): Readonly<Cliofo> =>
    Object.freeze(new Cliofo(new CliofoStrings(prefixString, argumentStrings)));

/**
 * A container for organizing parsed Cliofo output.
 */
type ParsedCliofoArgument =
{
    /**
     * The parsed Cliofo operand, flag, or option strings.
     * @readonly
     */
    readonly strings: readonly string[]

    /**
     * The parsed Cliofo operand, flag, or option counts. This is the number of
     * occurrences of each operand, flag, or option accessible via a map.
     * @readonly
     */
    readonly counts: ReadonlyMap<string, number>

    /**
     * The parsed Cliofo operand, flag, or option indexes. This is the index or
     * indexes of the string argument that is or contains each passed operand,
     * flag, or option.
     * @readonly
     */
    readonly indexes: ReadonlyMap<string, readonly number[]>
};

export {parseStrings as default};
