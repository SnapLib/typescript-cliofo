import {CliofoPrefixParser} from "./cliofoPrefixParser.js";
import {CliofoStrings} from "./cliofoStrings.js";

export class CliofoCounts extends CliofoPrefixParser
{
    /**
     * A map containing the operand strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly operandCounts: ReadonlyMap<string, number>;

    /**
     * A map containing the flag strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly flagCounts: ReadonlyMap<string, number>;

    /**
     * A map containing the option strings as keys paired up with the number of
     * times each one occurs as its value.
     * @readonly
     */
    public readonly optionCounts: ReadonlyMap<string, number>;

    public readonly allCounts: ReadonlyMap<string, number>;

    readonly #jsonObj: Readonly<{[_: string]: ReadonlyMap<string, number>}>;

    public constructor(prefixString: string, args: readonly string[])
    {
        super(prefixString, args);
        const cliofoStrings: Readonly<CliofoStrings> = Object.freeze(new CliofoStrings(prefixString, args));

        this.operandCounts = Object.freeze(new Map([...new Set(cliofoStrings.operandStrings)].map(operandString => Object.freeze(
            [operandString, cliofoStrings.operandStrings.filter(otherOperandString => operandString === otherOperandString).length]) )));

        this.flagCounts = Object.freeze(new Map([...new Set(cliofoStrings.flagStrings)].map(flagString => Object.freeze(
            [flagString, cliofoStrings.flagStrings.filter(otherFlagString => flagString === otherFlagString).length]) )));

        this.optionCounts = Object.freeze(new Map([...new Set(cliofoStrings.optionStrings)].map(optionString => Object.freeze(
            [optionString, cliofoStrings.optionStrings.filter(otherOptionString => optionString === otherOptionString).length]) )));

        this.allCounts = Object.freeze(new Map([...new Set(cliofoStrings.allStrings)].map(operandFlagOption => Object.freeze(
            [ operandFlagOption,
              cliofoStrings.allStrings.filter(otherOperandFlagOption => operandFlagOption === otherOperandFlagOption).length]) )));

        this.#jsonObj = Object.freeze({
            operandCounts: this.operandCounts,
            flagCounts: this.flagCounts,
            optionCounts: this.optionCounts
        });
    }

    /**
     * Returns an object containing this object's {@link operandCounts},
     * {@link flagCounts}, and {@link optionCounts} properties.
     *
     * @returns an object containing this object's {@link operandCounts},
     * {@link flagCounts}, and {@link optionCounts} properties.
     */
    public jsonObj(): Readonly<{[_: string]: ReadonlyMap<string, number>}> {return this.#jsonObj;}

    /**
     * Returns a  JSON string of this object's {@link operandCounts},
     * {@link flagCounts}, and {@link optionCounts} properties.
     *
     * @param format Options to format the generated JSON string.
     *
     * @returns A JSON string of this object's {@link operandCounts},
     * {@link flagCounts}, and {@link optionCounts} properties.
     */
    public jsonString(format: Partial<{
        replacer?: (this: unknown, key: string, value: unknown) => unknown | (string|number)[],
        space?: string | number
    }> = {}): string
    { return JSON.stringify(this.#jsonObj, format.replacer, format.space); }
}

export {CliofoCounts as default};
