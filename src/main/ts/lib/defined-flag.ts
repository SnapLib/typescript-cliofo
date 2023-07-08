import { type DefinedArgument } from "./defined-argument.js";
import { UndefinedFlag, undefinedFlag } from "./undefined-flag.js";

export class DefinedFlag extends UndefinedFlag implements DefinedArgument
{
    readonly #description: string;
    readonly #name: string;

    public constructor(undefinedFlag: UndefinedFlag, description: NonNullable<string>, name: NonNullable<string>)
    {
        super(undefinedFlag);
        this.#description = description;
        this.#name = name;
    }

    public get description() { return this.#description; }
    public get name() { return this.#name; }

    public equals(obj: unknown): boolean
    {
        return    super.equals(obj)
               && obj instanceof DefinedFlag
               && this.#description === obj.#description
               && this.#name === obj.#name;
    }
}

export function definedFlag(prefixStringOrCodePoint: string | number, valueStringOrCodePoint: string | number, description?: string, name?: string): DefinedFlag;
export function definedFlag(undefinedFlag: UndefinedFlag, description?: string, name?: string): DefinedFlag;
export function definedFlag(prefixStringOrUndefinedFlag: string | number | UndefinedFlag, valueStringOrCodePointOrDescription?: string | number, nameOrDescription?: string, name?: string): DefinedFlag
{
    if (prefixStringOrUndefinedFlag instanceof UndefinedFlag)
    {
        return new DefinedFlag(prefixStringOrUndefinedFlag, nullableStringOrNumberToString(valueStringOrCodePointOrDescription), nameOrDescription ?? "");
    }

    return new DefinedFlag(
        undefinedFlag(
            nullableStringOrNumberToString(prefixStringOrUndefinedFlag),
            nullableStringOrNumberToString(valueStringOrCodePointOrDescription)),
            nameOrDescription ?? "",
            name ?? "");
}

const nullableStringOrNumberToString = function(stringOrNumber?: string | number): string
{
    if (stringOrNumber === undefined || stringOrNumber === null) { return ""; }
    return typeof stringOrNumber === "string" ? stringOrNumber : String.fromCodePoint(stringOrNumber);
};
