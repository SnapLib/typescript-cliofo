import {CliofoCounts} from "./lib/cliofoCounts.js";
import {CliofoStrings} from "./lib/cliofoStrings.js";

/**
 * The root class of the entire Cliofo package. Classes from this package's
 * library are used to parse strings into operands, flags, and options
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
    public readonly cliofoStrings: Readonly<CliofoStrings>;

    // TODO add indexes map object
    /**
     * The operand strings contained within this object's {@link cliofoStrings}
     * string arguments when parsed with this object's {@link prefixString}.
     * Strings that don't start with this object's {@link prefixString} are
     * operands.
     * @readonly
     */
    public readonly operand: Readonly<{ strings: readonly string[],
                                        counts: ReadonlyMap<string, number> }>;

    /**
     * The flag character strings contained withn this object's
     * {@link cliofoStrings} string arguments when parsed with this object's
     * {@link prefixString} string. Strings that begin with only a single
     * leading instance of this object's {@link prefixString} are flags. The
     * characters of each flag string are stored as individual characters as
     * opposed to the entire string (like {@link operand} and {@link option}
     * strings).
     * @readonly
     */
    public readonly flag: Readonly<{ strings: readonly string[],
                                     counts: ReadonlyMap<string, number> }>;

    /**
     * The operand strings contained within this object's {@link cliofoStrings}
     * string arguments when parsed with this object's {@link prefixString}.
     * string that start with this object's {@link prefixString} are
     * operands.
     * @readonly
     */
    public readonly option: Readonly<{ strings: readonly string[],
                                       counts: ReadonlyMap<string, number> }>;

    /**
     * Contains clones of this object, except with {@link operand},
     * {@link flag}, and {@link option} properties with all duplicate values
     * removed.
     */
    public readonly distinct: Readonly<{
        operands: readonly string[], flags: readonly string[], options: readonly string[], all: readonly string[]}>;

    public constructor(cliofoStrings: Readonly<CliofoStrings>)
    {
        if (cliofoStrings instanceof CliofoStrings)

        {
            this.cliofoStrings = cliofoStrings;
            this.prefixString = this.cliofoStrings.prefixString;

            const occurrenceCount = Object.freeze(new CliofoCounts(this.prefixString, this.cliofoStrings.arguments));

            this.operand = Object.freeze({
            strings: this.cliofoStrings.operandStrings,
            counts: occurrenceCount.operandCounts
            });

            this.flag = Object.freeze({
                strings: this.cliofoStrings.flagStrings,
                counts: occurrenceCount.flagCounts
            });

            this.option = Object.freeze({
                strings: this.cliofoStrings.optionStrings,
                counts: occurrenceCount.optionCounts
            });

            this.distinct = Object.freeze({
                operands: Object.freeze([...occurrenceCount.operandCounts.keys()]),
                flags: Object.freeze([...occurrenceCount.flagCounts.keys()]),
                options: Object.freeze([...occurrenceCount.optionCounts.keys()]),
                all: Object.freeze([...new Set(this.cliofoStrings.allStrings)])
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
                        prefixString: this.cliofoStrings.prefixString,
                        strings: this.cliofoStrings.arguments,
                        operands: this.cliofoStrings.operandStrings,
                        flags: this.cliofoStrings.flagStrings,
                        options: this.cliofoStrings.optionStrings
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
 * @remarks Returns a new {@link Cliofo} object constructed with the passed sarguments.
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
export const cliofo = (prefixString: string, argumentStrings: readonly string[]): Readonly<Cliofo> =>
    Object.freeze(new Cliofo(new CliofoStrings(prefixString, argumentStrings)));

export {cliofo as default};

const _cliofo: Readonly<Cliofo> = Object.freeze(cliofo("-", process.argv.slice(2)));

console.log(_cliofo);
