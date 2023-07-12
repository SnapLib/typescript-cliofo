import { type DefinedArgument } from "./defined-argument.js";
import { FlagString, flagString } from "./flag-string.js";

export class DefinedFlag extends FlagString implements DefinedArgument
{
    readonly #description: string;
    readonly #name: string;

    public constructor(undefinedFlag: FlagString, description: NonNullable<string>, name: NonNullable<string>)
    {
        super(undefinedFlag);
        this.#description = description;
        this.#name = name;
    }

    public get description(): string { return this.#description; }
    public get name(): string { return this.#name; }

    public equals(obj: unknown): boolean
    {
        return    super.equals(obj)
               && obj instanceof DefinedFlag
               && this.#description === obj.#description
               && this.#name === obj.#name;
    }
}

export function definedFlag(prefixStringOrCodePoint: string | number, valueStringOrCodePoint: string | number, description?: string, name?: string): DefinedFlag;
export function definedFlag(undefinedFlag: FlagString, description?: string, name?: string): DefinedFlag;
export function definedFlag(prefixStringOrUndefinedFlag: string | number | FlagString, valueStringOrCodePointOrDescription?: string | number, nameOrDescription?: string, name?: string): DefinedFlag
{
    if (prefixStringOrUndefinedFlag instanceof FlagString)
    {
        return new DefinedFlag(prefixStringOrUndefinedFlag, nullableStringOrNumberToString(valueStringOrCodePointOrDescription), nameOrDescription ?? "");
    }

    return new DefinedFlag(
        flagString(
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

export {definedFlag as default};
