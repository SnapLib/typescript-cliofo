import {CliofoCounts} from "./lib/cliofoCounts.js";
import {CliofoIndexes} from "lib/cliofoIndexes.js";
import {CliofoStrings} from "./lib/cliofoStrings.js";
import {ParsedCliofoArgument} from "./lib/parsedCliofoArgument.js";

/**
 * The different types of Cliofo prefix parsers there are. These include types
 * such as:
 *
 * - {@link CliofoStrings}
 * - {@link CliofoCounts}
 * - {@link CliofoIndexes}
 */
type CliofoParserType = CliofoStrings | CliofoCounts | CliofoIndexes;

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
    public readonly arguments: Readonly<CliofoStrings>;

    // TODO add indexes map object
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

    /**
     * Contains a clone of this object, except with all duplicate values
     * removed.
     */
    public readonly distinct: Readonly<{
        operands: readonly string[], flags: readonly string[], options: readonly string[], all: readonly string[]}>;

    public constructor(cliofoStrings: Readonly<CliofoParserType>)
    {
        if (cliofoStrings instanceof CliofoStrings)

        {
            this.arguments = cliofoStrings;
            this.prefixString = this.arguments.prefixString;

            const occurrenceCount = Object.freeze(new CliofoCounts(this.prefixString, this.arguments.arguments));

            this.operand = Object.freeze({
                strings: this.arguments.operandStrings,
                counts: occurrenceCount.operandCounts
            });

            this.flag = Object.freeze({
                strings: this.arguments.flagStrings,
                counts: occurrenceCount.flagCounts
            });

            this.option = Object.freeze({
                strings: this.arguments.optionStrings,
                counts: occurrenceCount.optionCounts
            });

            this.distinct = Object.freeze({
                operands: Object.freeze([...occurrenceCount.operandCounts.keys()]),
                flags: Object.freeze([...occurrenceCount.flagCounts.keys()]),
                options: Object.freeze([...occurrenceCount.optionCounts.keys()]),
                all: Object.freeze([...new Set(this.arguments.allStrings)])
            });
        }
        else
        {
            throw new Error();
        }
    }

    public toJSON(format: Partial<{
        verbose: boolean,
        replacer?: (this: unknown, key: string, value: unknown) => unknown | (string|number)[],
        space?: string | number
    }> = {}): string
    {
        return format.verbose
                   ? JSON.stringify({
                        prefixString: this.arguments.prefixString,
                        strings: this.arguments.arguments,
                        operands: this.arguments.operandStrings,
                        flags: this.arguments.flagStrings,
                        options: this.arguments.optionStrings
                    },
                    format.replacer,
                    format.space)
                   : JSON.stringify(this, format.replacer, format.space);
    }
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

export {parseStrings as default};

const _cliofo: Readonly<Cliofo> = Object.freeze(parseStrings("-", process.argv.slice(2)));

console.log(_cliofo);
