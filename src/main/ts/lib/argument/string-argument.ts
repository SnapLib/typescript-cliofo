import {CliofoType} from "lib/cliofo-type.js";

export class StringArgument
{
    public readonly prefixString: string;

    public readonly stringValue: string;

    public readonly cliofoType: CliofoType;

    readonly #optionPrefixString: string;
    readonly #prefix: string;

    public constructor(prefixString: string, stringValue: string, cliofoType: CliofoType)
    {
        this.prefixString = prefixString;
        this.#optionPrefixString = this.prefixString.repeat(2);
        this.stringValue = stringValue;
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

    }

    public prefix(): string { return this.#prefix; }

    public isOperand(): boolean {return this.cliofoType === CliofoType.OPERAND; }

    public isFlag(): boolean {return this.cliofoType === CliofoType.FLAG; }

    public isOption(): boolean {return this.cliofoType === CliofoType.OPTION; }
}

export {StringArgument as default};
