import {CliofoPrefixCount} from "./lib/cliofoPrefixCount.js";
import {CliofoPrefixStrings} from "./lib/cliofoPrefixStrings.js";

export class Cliofo
{
    public readonly cliofoStrings: Readonly<CliofoPrefixStrings>;

    public readonly occurrenceCount: Readonly<CliofoPrefixCount>;

    public readonly distinct: Readonly<{
        operands: readonly string[], flags: readonly string[], options: readonly string[], all: readonly string[]}>;

    public constructor(prefixString: string, strings: readonly string[])
    {
        this.cliofoStrings = Object.freeze(new CliofoPrefixStrings(prefixString, strings));
        this.occurrenceCount = Object.freeze(new CliofoPrefixCount(this.cliofoStrings.prefixString, this.cliofoStrings.arguments));
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

export {Cliofo as default};

const cliofo: Readonly<Cliofo> = Object.freeze(new Cliofo("-", process.argv.slice(2)));

console.log(cliofo.occurrenceCount);
