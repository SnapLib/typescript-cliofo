import {OperandsFlagsOptions} from "lib/operandsFlagsOptions.js";
import {CliofoPrefixCount} from "./lib/cliofoPrefixCount.js";
import {CliofoPrefixParse} from "./lib/cliofoPrefixParse.js";

export class Cliofo
{
    public readonly parsedPrefix: Readonly<CliofoPrefixParse>;

    public readonly occurrenceCount: Readonly<CliofoPrefixCount>;

    public readonly distinct: Readonly<OperandsFlagsOptions>;

    public constructor(prefixString: string, strings: readonly string[])
    {
        this.parsedPrefix = Object.freeze(new CliofoPrefixParse(prefixString, strings));
        this.occurrenceCount = Object.freeze(new CliofoPrefixCount(this.parsedPrefix));
        this.distinct = Object.freeze({
            operands: Object.freeze([...this.occurrenceCount.operandsCountMap.keys()]),
            flags: Object.freeze([...this.occurrenceCount.flagsCountMap.keys()]),
            options: Object.freeze([...this.occurrenceCount.optionsCountMap.keys()]),
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
