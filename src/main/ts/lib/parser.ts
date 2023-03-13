import {Counts} from "./parser/counts.js";
import {Strings} from "./parser/strings.js";
import {Indexes} from "./parser/indexes.js";
import {PrefixParser} from "./parser/prefix-parser.js";
import {ParseError} from "./parser/parse-error.js";
import {type OperandFlagOption} from "./operand-flag-option.js";

/**
 * Class responsible for parsing command line interface strings into operands,
 * flags, and options.
 */
export class Parser implements OperandFlagOption<StringsCountsIndexes>
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
    public readonly arguments: readonly string[];

    /**
     * The operands contained with this object's {@link arguments} when parsed
     * with this object's {@link prefixString}. Strings that don't start with
     * this object's {@link prefixString} are operands. If this object's
     * {@link prefixString} is empty, then every string is interpreted as an
     * operand.
     *
     * @public
     * @readonly
     */
    public readonly operand: Readonly<StringsCountsIndexes>;

    /**
     * The flag characters contained with this object's {@link arguments} when
     * parsed with this object's {@link prefixString}. Strings that begin with
     * only a single leading instance of this object's {@link prefixString} are
     * flags. The characters of each flag string are stored as individual
     * characters as opposed to the entire string (unlike operands and options
     * which consist of the entire string).
     *
     * @public
     * @readonly
     */
    public readonly flag: Readonly<StringsCountsIndexes>;

    /**
     * The options contained within this object's {@link arguments} when parsed
     * with this object's {@link prefixString}. Strings that start with a
     * sequence of 2 or more adjacent instances of this object's
     * {@link prefixString} is an operand.
     *
     * @public
     * @readonly
     */
    public readonly option: Readonly<StringsCountsIndexes>;

    readonly #cliofoStrings: Readonly<Strings>;
    readonly #cliofoCounts: Readonly<Counts>;
    readonly #cliofoIndexes: Readonly<Indexes>;

    /**
     * Constructs a new instance of a {@link Parser} object from a
     * {@link PrefixParser} object.
     *
     * @param prefixParserOrOther The {@link PrefixParser} object to construct
     * a new {@link Parser} object instance from or another Parser object to
     * copy.
     */
    public constructor(prefixParserOrOther: Readonly<PrefixParser<unknown> | Parser>);

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
    public constructor(prefixString: string, strings: readonly string[]);
    constructor(prefixStringOrParsedCliofosOrOther: Readonly<PrefixParser<unknown>> | string | Readonly<Parser>, strings?: readonly string[])
    {
        if (prefixStringOrParsedCliofosOrOther instanceof Parser)
        {
            this.prefixString = prefixStringOrParsedCliofosOrOther.prefixString;
            this.arguments = prefixStringOrParsedCliofosOrOther.arguments;
            this.#cliofoStrings = prefixStringOrParsedCliofosOrOther.#cliofoStrings;
            this.#cliofoCounts = prefixStringOrParsedCliofosOrOther.#cliofoCounts;
            this.#cliofoIndexes = prefixStringOrParsedCliofosOrOther.#cliofoIndexes;
        }
        else if (typeof prefixStringOrParsedCliofosOrOther === "string")
        {
            this.prefixString = prefixStringOrParsedCliofosOrOther;
            this.arguments = strings === undefined || strings === null
                ? Object.freeze ([])
                : Object.isFrozen(strings) ? strings : Object.freeze([...strings]);
            this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.arguments));
            this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.arguments));
            this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.arguments));
        }
        else if (prefixStringOrParsedCliofosOrOther instanceof PrefixParser<unknown>)
        {

            if (prefixStringOrParsedCliofosOrOther instanceof Strings)
            {
                this.#cliofoStrings =
                    Object.isFrozen(prefixStringOrParsedCliofosOrOther) ? prefixStringOrParsedCliofosOrOther
                    : Object.freeze(new Strings(prefixStringOrParsedCliofosOrOther.prefixString, prefixStringOrParsedCliofosOrOther.arguments));
                this.prefixString = this.#cliofoStrings.prefixString;
                this.arguments = this.#cliofoStrings.arguments;
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.arguments));
            }
            else if (prefixStringOrParsedCliofosOrOther instanceof Counts)
            {
                this.#cliofoCounts =
                    Object.isFrozen(prefixStringOrParsedCliofosOrOther) ? prefixStringOrParsedCliofosOrOther
                    : Object.freeze(new Counts(prefixStringOrParsedCliofosOrOther.prefixString, prefixStringOrParsedCliofosOrOther.arguments));
                this.prefixString = this.#cliofoCounts.prefixString;
                this.arguments = this.#cliofoCounts.arguments;
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.arguments));
            }
            else if (prefixStringOrParsedCliofosOrOther instanceof Indexes)
            {
                this.#cliofoIndexes =
                    Object.isFrozen(prefixStringOrParsedCliofosOrOther) ? prefixStringOrParsedCliofosOrOther
                    : Object.freeze(new Indexes(prefixStringOrParsedCliofosOrOther.prefixString, prefixStringOrParsedCliofosOrOther.arguments));
                this.prefixString = this.#cliofoIndexes.prefixString;
                this.arguments = this.#cliofoIndexes.arguments;
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.arguments));
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.arguments));
            }
            else
            {
                this.prefixString = prefixStringOrParsedCliofosOrOther.prefixString;
                this.arguments = Object.isFrozen(prefixStringOrParsedCliofosOrOther.arguments)
                    ? prefixStringOrParsedCliofosOrOther.arguments
                    : Object.freeze([...prefixStringOrParsedCliofosOrOther.arguments]);
                this.#cliofoStrings = Object.freeze(new Strings(this.prefixString, this.arguments));
                this.#cliofoCounts = Object.freeze(new Counts(this.prefixString, this.arguments));
                this.#cliofoIndexes = Object.freeze(new Indexes(this.prefixString, this.arguments));
            }
        }
        else
        {
            throw new ParseError(`could not parse "${prefixStringOrParsedCliofosOrOther}" and ${strings}`);
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

    /**
     * Getter for this object's internal {@link arguments} instance.
     *
     * @returns This object's internal {@link arguments} instance.
     *
     * @public
     * @method
     */
    public cliofoStrings(): Readonly<Strings> {return this.#cliofoStrings;}

    /**
     * Getter for this object's internal {@link counts} instance.
     *
     * @returns This object's internal {@link counts} instance.
     *
     * @public
     * @method
     */
    public cliofoCounts(): Readonly<Counts> {return this.#cliofoCounts;}

    /**
     * Getter for this object's internal {@link indexes} instance.
     *
     * @returns This object's internal {@link indexes} instance.
     *
     * @public
     * @method
     */
    public cliofoIndexes(): Readonly<Indexes> {return this.#cliofoIndexes;}
}

/**
 * A container for organizing parsed Cliofo output.
 */
type StringsCountsIndexes =
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

export {Parser as default};
