import {Counts} from "./parser/counts.js";
import {Strings} from "./parser/strings.js";
import {Indexes} from "./parser/indexes.js";
import {PrefixParser} from "./parser/prefix-parser.js";

/**
 * Class responsible for parsing command line interface strings into operands,
 * flags, and options.
 */
export class Parser
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
     * {@link prefixString} into operands, flags, and options.
     *
     * @public
     * @readonly
     */
    public readonly strings: readonly string[];

    /**
     * The operands contained with this object's {@link strings} when parsed
     * with this object's {@link prefixString}. Strings that don't start with
     * this object's {@link prefixString} are operands. If this object's
     * {@link prefixString} is empty, then every string is interepreted as an
     * operand.
     *
     * @public
     * @readonly
     */
    public readonly operand: Readonly<ParsedCliofoArgument>;

    /**
     * The flag characters contained with this object's {@link strings} when
     * parsed with this object's {@link prefixString}. Strings that begin with
     * only a single leading instance of this object's {@link prefixString} are
     * flags. The characters of each flag string are stored as individual
     * characters as opposed to the entire string (unlike operands and options
     * which consist of the entire string).
     *
     * @public
     * @readonly
     */
    public readonly flag: Readonly<ParsedCliofoArgument>;

    /**
     * The options contained within this object's {@link strings} when parsed
     * with this object's {@link prefixString}. Strings that start with a
     * sequence of 2 or more adjacent instances of this object's
     * {@link prefixString} is an operand.
     *
     * @public
     * @readonly
     */
    public readonly option: Readonly<ParsedCliofoArgument>;

    readonly #cliofoStrings: Readonly<Strings>;
    readonly #cliofoCounts: Readonly<Counts>;
    readonly #cliofoIndexes: Readonly<Indexes>;

    /**
     * Constructs a new instance of a {@link Parser} object from a
     * {@link PrefixParser} object.
     *
     * @param parsedCliofos The {@link PrefixParser} object to construct
     * the new {@link Parser} object instance from.
     */
    public constructor(parsedCliofos: PrefixParser<unknown>);

    /**
     * Constructs a new instance of a {@link Parser} object using the provided
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
    constructor(prefixStringOrParsedCliofos: Readonly<PrefixParser<unknown>> | string, strings?: readonly string[])
    {
        if (typeof prefixStringOrParsedCliofos === "string")
        {
            this.prefixString = prefixStringOrParsedCliofos;
            this.strings = strings === undefined || strings === null
                ? Object.freeze ([])
                : Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
            this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.strings));
            this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.strings));
            this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.strings));
        }
        else if (prefixStringOrParsedCliofos instanceof PrefixParser<unknown>)
        {

            if (prefixStringOrParsedCliofos instanceof Strings)
            {
                this.#cliofoStrings =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new Strings(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoStrings.prefixString;
                this.strings = this.#cliofoStrings.arguments;
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.strings));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.strings));
            }
            else if (prefixStringOrParsedCliofos instanceof Counts)
            {
                this.#cliofoCounts =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new Counts(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoCounts.prefixString;
                this.strings = this.#cliofoCounts.arguments;
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.strings));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.strings));
            }
            else if (prefixStringOrParsedCliofos instanceof Indexes)
            {
                this.#cliofoIndexes =
                    Object.isFrozen(prefixStringOrParsedCliofos) ? prefixStringOrParsedCliofos
                    : Object.freeze(new Indexes(prefixStringOrParsedCliofos.prefixString, prefixStringOrParsedCliofos.arguments));
                this.prefixString = this.#cliofoIndexes.prefixString;
                this.strings = this.#cliofoIndexes.arguments;
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.strings));
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.strings));
            }
            else
            {
                this.prefixString = prefixStringOrParsedCliofos.prefixString;
                this.strings = Object.isFrozen(prefixStringOrParsedCliofos.arguments)
                    ? prefixStringOrParsedCliofos.arguments
                    : Object.freeze([...prefixStringOrParsedCliofos.arguments]);
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.strings));
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.strings));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.strings));
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

    public cliofoStrings(): Readonly<Strings> {return this.#cliofoStrings;}

    public cliofoCounts(): Readonly<Counts> {return this.#cliofoCounts;}

    public cliofoIndexes(): Readonly<Indexes> {return this.#cliofoIndexes;}
}

/**
 * The passed `prefixString` string argument is used to parse the strings of the
 * passed `argumentStrings` string array.
 *
 * @remarks Returns a new {@link Parser} object constructed from the passed
 *          arguments.
 *
 * @param prefixString The leading prefix `string` used to denote which
 *                     arguments are flags and options.
 *
 * @param argumentStrings The strings to parse with the prefix string (provided
 *                        via the passed `prefixString` string argument).
 *
 * @returns a new {@link Parser} instance constructed with the provided
 *          `prefixString` and `argumentStrings` argument.
 */
export const parseStrings = (prefixString: string, argumentStrings: readonly string[]): Readonly<Parser> =>
    Object.freeze(new Parser(new Strings(prefixString, argumentStrings)));

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
