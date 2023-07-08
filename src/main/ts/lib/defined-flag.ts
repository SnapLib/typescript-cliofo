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

export function definedFlag(prefixString: string, valueString: string, description?: string, name?: string): DefinedFlag;
export function definedFlag(prefixCodePoint: number, valueString: string, description?: string, name?: string): DefinedFlag;
export function definedFlag(undefinedFlag: UndefinedFlag, description?: string, name?: string): DefinedFlag;
export function definedFlag(prefixStringOrUndefinedFlag: string | number | UndefinedFlag, valueStringOrDescription?: string, nameOrDescription?: string, name?: string): DefinedFlag
{
    if (typeof prefixStringOrUndefinedFlag === "string")
    {
        return new DefinedFlag(undefinedFlag(prefixStringOrUndefinedFlag, valueStringOrDescription ?? ""), nameOrDescription ?? "", name ?? "");
    }

    if (typeof prefixStringOrUndefinedFlag === "number")
    {
        return new DefinedFlag(undefinedFlag(prefixStringOrUndefinedFlag, valueStringOrDescription ?? ""), nameOrDescription ?? "", name ?? "");
    }

    return new DefinedFlag(prefixStringOrUndefinedFlag, valueStringOrDescription ?? "", nameOrDescription ?? "");
}
