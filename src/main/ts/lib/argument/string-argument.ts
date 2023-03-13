import {CliofoType} from "../../lib/cliofo-type.js";

export class StringArgument
{
    /**
     * The leading prefix `string` that denotes this argument as a flag and is
     * used to create the leading prefix `string` that denotes this argument as
     * an option. The lack of this leading prefix `string` denotes this argument
     * as an operand or if the leading prefix string is empty (`""`), then this
     * argument will also be interpreted as an operand.
     *
     * @public
     * @readonly
     */
    public readonly prefixString: string;

    /**
     * @public
     * @readonly
     */
    public readonly notPrefixed: string;

    /**
     * @public
     * @readonly
     */
    public readonly prefixed: string;

    /**
     * @public
     * @readonly
     */
    public readonly cliofoType: CliofoType;

    readonly #optionPrefixString: string;
    readonly #prefix: string;
    readonly #isOperand: boolean;
    readonly #isFlag: boolean;
    readonly #isOption: boolean;
    readonly #flagString: string;
    readonly #optionString: string;

    public constructor(prefixString: string, notPrefixedString: string, cliofoType: CliofoType)
    {
        this.prefixString = prefixString;
        this.notPrefixed = notPrefixedString;
        this.#optionPrefixString = this.prefixString.length === 0 ? this.prefixString
            : this.prefixString.repeat(2);
        this.cliofoType = cliofoType;

        switch (this.cliofoType) {
            case CliofoType.OPERAND:
            case CliofoType.FLAG:
                this.#prefix = this.prefixString;
                break;
            case CliofoType.OPTION:
                this.#prefix = this.#optionPrefixString;
                break;
            default:
                throw new Error();
        }

        this.#isOperand = this.cliofoType === CliofoType.OPERAND;
        this.#isFlag = this.cliofoType === CliofoType.FLAG;
        this.#isOption = this.cliofoType === CliofoType.OPTION;

        this.prefixed =  this.prefixString.length === 0 || this.#isOperand
            ? this.notPrefixed : (this.#prefix += this.notPrefixed);

        this.#flagString = this.prefixString.length === 0 || this.#isFlag
            ? this.prefixed : (this.prefixString += this.notPrefixed);

        this.#optionString = this.prefixString.length === 0 || this.#isOption
            ? this.prefixed
            : `${this.prefixString.repeat(2)}${this.notPrefixed}`;
    }

    public prefix(): string { return this.#prefix; }

    public asFlagString(): string { return this.#flagString; }

    public asOptionString(): string { return this.#optionString; }

    public isOperand(): boolean { return this.#isOperand; }

    public isFlag(): boolean { return this.#isFlag; }

    public isOption(): boolean { return this.#isOption; }
}

export {StringArgument as default};
