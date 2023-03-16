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
     * Returns this argument's `string` value without the leading
     * {@link prefixString} prepended to it.
     *
     * @public
     * @readonly
     */
    public readonly nonPrefixedString: string;

    /**
     * Returns this argument's `string` value prepended appropriately with its
     * leading {@link prefixString} respective to whether it's an operand, flag,
     * or option.
     *
     * If this argument is an operand and/or the {@link prefixString} is an
     * empty `string` (`""`), then this object's {@link nonPrefixedString} is
     * returned.
     *
     * If this argument is a flag, then this object's {@link nonPrefixedString}
     * is returned prepended by a single leading instance of this object's
     * {@link prefixString}.
     *
     * If this argument is an option, then this object's
     * {@link nonPrefixedString} is returned prepended by a sequence of 2
     * adjacent instances of this object's {@link prefixString}.
     *
     * @public
     * @readonly
     */
    public readonly prefixedString: string;

    /**
     * Returns the value used to specify whether this argument is an operand,
     * flag, or option.
     *
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

    public constructor(other: Readonly<StringArgument>);
    /**
     * Constructs a new object instance used to represent a command line
     * argument as an operand, flag, or option.
     *
     * @param prefixString The `string` used to denote this argument as a flag
     *                     or option (or operand).
     *
     * @param nonPrefixedString This argument's `string` value excluding its
     *                          leading prefix `string`.
     *
     * @param cliofoType The operand, flag, or option type of command line
     *                   argument this argument is.
     */
    public constructor(prefixString: string, nonPrefixedString: string, cliofoType: CliofoType);
    constructor(prefixStringOrOther: string | Readonly<StringArgument>, nonPrefixedString?: string, cliofoType?: CliofoType)
    {
        if (typeof prefixStringOrOther === "string" && nonPrefixedString !== undefined && cliofoType !== undefined && nonPrefixedString !== null && cliofoType !== null)
        {
            this.prefixString = prefixStringOrOther;
            this.nonPrefixedString = nonPrefixedString;
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

            this.prefixedString =  this.prefixString.length === 0 || this.#isOperand
                ? this.nonPrefixedString : (this.#prefix += this.nonPrefixedString);

            this.#flagString = this.prefixString.length === 0 || this.#isFlag
                ? this.prefixedString : (this.prefixString += this.nonPrefixedString);

            this.#optionString = this.prefixString.length === 0 || this.#isOption
                ? this.prefixedString
                : `${this.prefixString.repeat(2)}${this.nonPrefixedString}`;
        }
        else if (prefixStringOrOther instanceof StringArgument)
        {
            this.prefixString = prefixStringOrOther.prefixString;
            this.nonPrefixedString = prefixStringOrOther.nonPrefixedString;
            this.#optionPrefixString = prefixStringOrOther.#optionPrefixString;
            this.cliofoType = prefixStringOrOther.cliofoType;
            this.#prefix = prefixStringOrOther.#prefix;
            this.#isOperand = prefixStringOrOther.#isOperand;
            this.#isFlag = prefixStringOrOther.#isFlag;
            this.#isOption = prefixStringOrOther.#isOption;
            this.prefixedString =  prefixStringOrOther.prefixedString;
            this.#flagString = prefixStringOrOther.#flagString;
            this.#optionString = prefixStringOrOther.#optionString;
        }
        else
        {
            throw new Error();
        }
    }

    /**
     * Returns this object's prefix `string` respective to what
     * {@link cliofoType} it is.
     *
     * If it's an operand, then an empty `string` (`""`) is returned.
     *
     * If it's a flag, then this object's {@link prefixString} is returned.
     *
     * If it's an option, then this object's {@link prefixString} concatenated
     * to itself and returned.
     *
     * @returns This object's prefix `string` respective to what
     *          {@link cliofoType} it is.
     */
    public prefix(): string { return this.#prefix; }

    /**
     * Returns this object's {@link nonPrefixedString} prepended with this
     * object's {@link prefixString}.
     *
     * @returns This object's {@link nonPrefixedString} prepended with this
     *          object's {@link prefixString}.
     */
    public asFlagString(): string { return this.#flagString; }

    /**
     * Returns this object's {@link nonPrefixedString} prepended with 2
     * adjacent instances of this object's {@link prefixString}.
     *
     * @returns This object's {@link nonPrefixedString} prepended with 2
     *          adjacent instances of this object's {@link prefixString}.
     */
    public asOptionString(): string { return this.#optionString; }

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
}

export {StringArgument as default};
