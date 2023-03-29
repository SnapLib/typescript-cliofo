import {CliofoType} from "../../lib/cliofo-type.js";

export class StringArgument
{
    /**
     * Returns this object's `string` value. This is the `string`
     *
     * @public
     * @readonly
     */
    public readonly stringValue: string;

    /**
     * Returns the value used to specify whether this argument is an operand,
     * flag, or option.
     *
     * @public
     * @readonly
     */
    public readonly cliofoType: CliofoType;
    readonly #isOperand: boolean;
    readonly #isFlag: boolean;
    readonly #isOption: boolean;

    /**
     * Constructs a new object instance used to represent a command line
     * argument as an operand, flag, or option by copying the properties of
     * another instance of itself.
     *
     * @param other {@link StringArgument} to copy properties from to newly
     *              constructed object instance.
     */
    public constructor(other: Readonly<StringArgument>);
    /**
     * Constructs a new object instance used to represent a command line
     * argument as an operand, flag, or option.
     *
     * @param stringValue This argument's `string` value excluding its
     *                    leading prefix `string`.
     *
     * @param cliofoType The operand, flag, or option type of command line
     *                   argument this argument is.
     */
    public constructor(stringValue: string, cliofoType: CliofoType);

    constructor( aStringValueOrOther: string | Readonly<StringArgument>,
                 cliofoType?: CliofoType )
    {
        if (typeof aStringValueOrOther === "string" && cliofoType !== undefined && cliofoType !== null)
        {
            this.stringValue = aStringValueOrOther;
            this.cliofoType = cliofoType;

            this.#isOperand = this.cliofoType === CliofoType.OPERAND;
            this.#isFlag = this.cliofoType === CliofoType.FLAG;
            this.#isOption = this.cliofoType === CliofoType.OPTION;
        }
        else if (aStringValueOrOther instanceof StringArgument)
        {
            this.stringValue = aStringValueOrOther.stringValue;
            this.cliofoType = aStringValueOrOther.cliofoType;
            this.#isOperand = aStringValueOrOther.#isOperand;
            this.#isFlag = aStringValueOrOther.#isFlag;
            this.#isOption = aStringValueOrOther.#isOption;
        }
        else
        {
            throw new Error();
        }
    }

    /**
     * Returns `true` if this object's {@link cliofoType} is a
     * {@link CliofoType.OPERAND}.
     *
     * @returns `true` if this object's {@link cliofoType} is a
     *          {@link CliofoType.OPERAND}.
     */
    public isOperand(): boolean { return this.#isOperand; }

    /**
     * Returns `true` if this object's {@link cliofoType} is a
     * {@link CliofoType.FLAG}.
     *
     * @returns `true` if this object's {@link cliofoType} is a
     *          {@link CliofoType.FLAG}.
     */
    public isFlag(): boolean { return this.#isFlag; }

    /**
     * Returns `true` if this object's {@link cliofoType} is a
     * {@link CliofoType.OPTION}.
     *
     * @returns `true` if this object's {@link cliofoType} is a
     *          {@link CliofoType.OPTION}.
     */
    public isOption(): boolean { return this.#isOption; }

    public equals(other: unknown): boolean
    {
        return other !== undefined && other !== null && other instanceof StringArgument
            && this.stringValue === other.stringValue && this.cliofoType === other.cliofoType;
    }
}

export {StringArgument as default};
