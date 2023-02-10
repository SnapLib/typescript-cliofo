import {OperandsFlagsOptions} from "lib/operandsFlagsOptions.js";
import {CliofoPrefixOccurrenceCount} from "./lib/cliofoPrefixOccurrenceCount.js";
import {CliofoPrefixParse} from "./lib/cliofoPrefixParse.js";

export class Cliofo
{
    public readonly parsedPrefix: Readonly<CliofoPrefixParse>;

    public readonly occurrenceCount: Readonly<CliofoPrefixOccurrenceCount>;

    public readonly distinct: Readonly<OperandsFlagsOptions>;

    public constructor(prefixString: string, strings: readonly string[])
    {
        this.parsedPrefix = Object.freeze(new CliofoPrefixParse(prefixString, strings));
        this.occurrenceCount = Object.freeze(new CliofoPrefixOccurrenceCount(this.parsedPrefix));
        this.distinct = Object.freeze({
            operands: Object.freeze([...new Set(this.parsedPrefix.operands)]),
            flags: Object.freeze([...new Set(this.parsedPrefix.flags)]),
            options: Object.freeze([...new Set(this.parsedPrefix.options)]),
            all: Object.freeze([...new Set(this.parsedPrefix.all)])
        });
    }

    public toJSON(format: Partial<{verbose: boolean, replacer: (_: unknown) => unknown, space: string | number}> = {}): string
    {
        return format.verbose
                   ? JSON.stringify({
                        prefixString: this.parsedPrefix.prefixString,
                        strings: this.parsedPrefix.strings,
                        operands: this.parsedPrefix.operands,
                        flags: this.parsedPrefix.flags,
                        options: this.parsedPrefix.options
                    },
                    format.replacer,
                    format.space)
                   : JSON.stringify(this);
    }
}

export {Cliofo as default};

// console.log(new Cliofo("-", process.argv.slice(2)).prefixParsed().distinct());
// console.log(new Cliofo("-", process.argv.slice(2)).occurrenceCount().toJSON({space: 2}));
// console.log(new Cliofo("-", process.argv.slice(2)).occurrenceCount().flagsOccurrenceCountMap());
// console.log(new Cliofo("-", process.argv.slice(2)).toJSON({verbose: true, space: 2}));
console.log(new Cliofo("-", process.argv.slice(2)).occurrenceCount);
