import {CliofoCounts} from "./lib/cliofoCounts.js";
import {CliofoStrings} from "./lib/cliofoStrings.js";
import {type CliofoParserType} from "./lib/cliofoParserType.js";
import {CliofoIndexes} from "./lib/cliofoIndexes.js";

/**
 * The root entry point of the entire Cliofo package. Classes from this
 * package's library are used to parse strings into operands, flags, and options
 * based on a prefix string.
 *
 * @remarks This class doesn't directly parse/consume any string arguments.
 * Functions that parse/consume command line arguments and create
 * `Cliofo` objects are provided by this package instead such as {@link cliofo}.
 */
export class Cliofo
{
    /**
     * The `string` to denote flags and options( and operands).
     * @readonly
     */
    public readonly prefixString: string;

    /**
     * The `string[]` of arguments to parse with the {@link prefixString} `string`.
     * @readonly
     */
    // public readonly arguments: Readonly<CliofoStrings>;

    /**
     * The operand strings contained within this object's {@link arguments}
     * string arguments when parsed with this object's {@link prefixString}.
     * Strings that don't start with this object's {@link prefixString} are
     * operands.
     * @readonly
     */
    public readonly operand: Readonly<ParsedCliofoArgument>;

    /**
     * The flag character strings contained with this object's
     * {@link arguments} string arguments when parsed with this object's
     * {@link prefixString} string. Strings that begin with only a single
     * leading instance of this object's {@link prefixString} are flags. The
     * characters of each flag string are stored as individual characters as
     * opposed to the entire string (like {@link operand} and {@link option}
     * strings).
     * @readonly
     */
    public readonly flag: Readonly<ParsedCliofoArgument>;

    /**
     * The operand strings contained within this object's {@link arguments}
     * string arguments when parsed with this object's {@link prefixString}.
     * string that start with this object's {@link prefixString} are operands.
     * @readonly
     */
    public readonly option: Readonly<ParsedCliofoArgument>;

    readonly #cliofoStrings: Readonly<CliofoStrings>;
    readonly #cliofoCounts: Readonly<CliofoCounts>;
    readonly #cliofoIndexes: Readonly<CliofoIndexes>;

    public constructor(parsedCliofos: Readonly<CliofoParserType>)
    {
        if (parsedCliofos instanceof CliofoStrings)
        {
            this.#cliofoStrings = Object.isFrozen(parsedCliofos) ? parsedCliofos : Object.freeze(new CliofoStrings(parsedCliofos.prefixString, parsedCliofos.arguments));
            this.prefixString = this.#cliofoStrings.prefixString;

            this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.#cliofoStrings.arguments));
            this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.#cliofoStrings.arguments));

            this.operand = Object.freeze({
                strings: this.#cliofoStrings.operandStrings,
                counts: this.#cliofoCounts.operandCounts,
                indexes: this.#cliofoIndexes.operandIndexes
            });

            this.flag = Object.freeze({
                strings: this.#cliofoStrings.flagStrings,
                counts: this.#cliofoCounts.flagCounts,
                indexes: this.#cliofoIndexes.flagIndexes
            });

            this.option = Object.freeze({
                strings: this.#cliofoStrings.optionStrings,
                counts: this.#cliofoCounts.optionCounts,
                indexes: this.#cliofoIndexes.optionIndexes
            });
        }
        else if (parsedCliofos instanceof CliofoCounts)
        {
            this.#cliofoCounts = Object.isFrozen(parsedCliofos) ? parsedCliofos : Object.freeze(new CliofoCounts(parsedCliofos.prefixString, parsedCliofos.arguments));
            this.prefixString = this.#cliofoCounts.prefixString;

            this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.#cliofoCounts.arguments));
            this.#cliofoIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.#cliofoCounts.arguments));

            this.operand = Object.freeze({
                strings: this.#cliofoStrings.operandStrings,
                counts: this.#cliofoCounts.operandCounts,
                indexes: this.#cliofoIndexes.operandIndexes
            });

            this.flag = Object.freeze({
                strings: this.#cliofoStrings.flagStrings,
                counts: this.#cliofoCounts.flagCounts,
                indexes: this.#cliofoIndexes.flagIndexes
            });

            this.option = Object.freeze({
                strings: this.#cliofoStrings.optionStrings,
                counts: this.#cliofoCounts.optionCounts,
                indexes: this.#cliofoIndexes.optionIndexes
            });
        }
        else if (parsedCliofos instanceof CliofoIndexes)
        {
            this.#cliofoIndexes = Object.isFrozen(parsedCliofos) ? parsedCliofos : Object.freeze(new CliofoIndexes(parsedCliofos.prefixString, parsedCliofos.arguments));
            this.prefixString = this.#cliofoIndexes.prefixString;

            this.#cliofoStrings = Object.freeze(new CliofoStrings(this.prefixString, this.#cliofoIndexes.arguments));
            this.#cliofoCounts = Object.freeze(new CliofoCounts(this.prefixString, this.#cliofoIndexes.arguments));

            this.operand = Object.freeze({
                strings: this.#cliofoStrings.operandStrings,
                counts: this.#cliofoCounts.operandCounts,
                indexes: this.#cliofoIndexes.operandIndexes
            });

            this.flag = Object.freeze({
                strings: this.#cliofoStrings.flagStrings,
                counts: this.#cliofoCounts.flagCounts,
                indexes: this.#cliofoIndexes.flagIndexes
            });

            this.option = Object.freeze({
                strings: this.#cliofoStrings.optionStrings,
                counts: this.#cliofoCounts.optionCounts,
                indexes: this.#cliofoIndexes.optionIndexes
            });
        }
        else
        {
            throw new Error();
        }

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
    readonly strings: readonly string[]
    readonly counts: ReadonlyMap<string, number>
    readonly indexes: ReadonlyMap<string, readonly number[]>
};

export {parseStrings as default};
