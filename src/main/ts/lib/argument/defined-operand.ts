import { type DefinedArgument } from "./defined-argument.js";
import { OperandString, operandString } from "./operand-string.js";

export class DefinedOperand extends OperandString implements DefinedArgument
{
    readonly #description: string;
    readonly #name: string;

    public constructor(undefinedOperand: OperandString, description: NonNullable<string>, name: NonNullable<string>)
    {
        super(undefinedOperand);
        this.#description = description;
        this.#name = name;
    }

    public get description(): string { return this.#description; }
    public get name(): string { return this.#name; }

    public equals(obj: unknown): boolean
    {
        return    super.equals(obj)
               && obj instanceof DefinedOperand
               && this.#description === obj.#description
               && this.#name === obj.#name;
    }
}

export function definedOperand(prefixStringOrCodePoint: string | number, valueStringOrCodePoint: string | number, description?: string, name?: string): DefinedOperand;
export function definedOperand(undefinedOperand: OperandString, description?: string, name?: string): DefinedOperand;
export function definedOperand(prefixStringOrUndefinedOperand: string | number | OperandString, valueStringOrCodePointOrDescription?: string | number, nameOrDescription?: string, name?: string): DefinedOperand
{
    if (prefixStringOrUndefinedOperand instanceof OperandString)
    {
        return new DefinedOperand(prefixStringOrUndefinedOperand, nullableStringOrNumberToString(valueStringOrCodePointOrDescription), nameOrDescription ?? "");
    }

    return new DefinedOperand(
        operandString(
            nullableStringOrNumberToString(prefixStringOrUndefinedOperand),
            nullableStringOrNumberToString(valueStringOrCodePointOrDescription)),
            nameOrDescription ?? "",
            name ?? "");
}

const nullableStringOrNumberToString = function(stringOrNumber?: string | number): string
{
    if (stringOrNumber === undefined || stringOrNumber === null) { return ""; }
    return typeof stringOrNumber === "string" ? stringOrNumber : String.fromCodePoint(stringOrNumber);
};

export {definedOperand as default};
