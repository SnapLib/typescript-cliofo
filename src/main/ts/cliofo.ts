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

    public readonly occurrenceCount: Readonly<CliofoCounts>;

    // TODO add indexes map object
    public readonly operand: Readonly<{ strings: readonly string[],
                                        counts: ReadonlyMap<string, number> }>;

    /**
     * The flag strings contained withn this object's {@link cliofoStrings}
     * string arguments when paresed with. Flags are stored as individual characters as opposed to
     * entire strings (like {@link operand} and {@link option} strings).
     * @readonly
     */
    public readonly flag: Readonly<{ strings: readonly string[],
                                     counts: ReadonlyMap<string, number> }>;

    public readonly option: Readonly<{ strings: readonly string[],
                                       counts: ReadonlyMap<string, number> }>;

    public readonly distinct: Readonly<{
        operands: readonly string[], flags: readonly string[], options: readonly string[], all: readonly string[]}>;

    public constructor(cliofoStrings: Readonly<CliofoStrings>)
    {
        this.cliofoStrings = cliofoStrings;
        this.prefixString = this.cliofoStrings.prefixString;
        this.occurrenceCount = Object.freeze(new CliofoCounts(this.cliofoStrings.prefixString, this.cliofoStrings.arguments));

        this.operand = Object.freeze({
            strings: this.cliofoStrings.operandStrings,
            counts: this.occurrenceCount.operandCounts
        });

        this.flag = Object.freeze({
            strings: this.cliofoStrings.flagStrings,
            counts: this.occurrenceCount.flagCounts
        });

        this.option = Object.freeze({
            strings: this.cliofoStrings.optionStrings,
            counts: this.occurrenceCount.optionCounts
        });

        this.distinct = Object.freeze({
            operands: Object.freeze([...this.occurrenceCount.operandCounts.keys()]),
            flags: Object.freeze([...this.occurrenceCount.flagCounts.keys()]),
            options: Object.freeze([...this.occurrenceCount.optionCounts.keys()]),
            all: Object.freeze([...new Set(this.cliofoStrings.allStrings)])
        });
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

console.log(_cliofo.occurrenceCount);
