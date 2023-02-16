import {CliofoCounts} from "./lib/cliofoCounts.js";
import {CliofoStrings} from "./lib/cliofoStrings.js";
import {type CliofoParserType} from "./lib/cliofoParserType.js";
import {CliofoIndexes} from "./lib/cliofoIndexes.js";

/**
 * A container for organizing parsed Cliofo output.
 */
interface ParsedCliofoArgument
{
    readonly strings: readonly string[]
    readonly counts: ReadonlyMap<string, number>
    readonly indexes: ReadonlyMap<string, readonly number[]>
}

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

            const occurrenceCounts = Object.freeze(new CliofoCounts(this.prefixString, this.arguments.arguments));
            const argIndexes = Object.freeze(new CliofoIndexes(this.prefixString, this.arguments.arguments));

            this.operand = Object.freeze({
                strings: this.arguments.operandStrings,
                counts: occurrenceCounts.operandCounts,
                indexes: argIndexes.operandIndexes
            });

            this.flag = Object.freeze({
                strings: this.arguments.flagStrings,
                counts: occurrenceCounts.flagCounts,
                indexes: argIndexes.flagIndexes
            });

            this.option = Object.freeze({
                strings: this.arguments.optionStrings,
                counts: occurrenceCounts.optionCounts,
                indexes: argIndexes.optionIndexes
            });

            this.distinct = Object.freeze({
                operands: Object.freeze([...occurrenceCounts.operandCounts.keys()]),
                flags: Object.freeze([...occurrenceCounts.flagCounts.keys()]),
                options: Object.freeze([...occurrenceCounts.optionCounts.keys()]),
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

console.log(_cliofo.arguments.arguments);
console.log("\n\n");
console.log(_cliofo.operand.indexes);
console.log("\n\n");
console.log(_cliofo.flag.indexes);
console.log("\n\n");
console.log(_cliofo.option.indexes);
