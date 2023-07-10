import { type DefinedArgument } from "./defined-argument.js";
import { UndefinedOption, undefinedOption } from "./undefined-option.js";

export class DefinedOption extends UndefinedOption implements DefinedArgument
{
    readonly #description: string;
    readonly #name: string;

    public constructor(undefinedOption: UndefinedOption, description: NonNullable<string>, name: NonNullable<string>)
    {
        super(undefinedOption);
        this.#description = description;
        this.#name = name;
    }

    public get description(): string { return this.#description; }
    public get name(): string { return this.#name; }

    public equals(obj: unknown): boolean
    {
        return    super.equals(obj)
               && obj instanceof DefinedOption
               && this.#description === obj.#description
               && this.#name === obj.#name;
    }
}

export function definedOption(prefixString: string, valueString: string, description?: string, name?: string): DefinedOption;
export function definedOption(undefinedOption: UndefinedOption, description?: string, name?: string): DefinedOption;
export function definedOption(prefixStringOrUndefinedOption: string | UndefinedOption, valueStringOrDescription?: string, nameOrDescription?: string, name?: string): DefinedOption
{
    if (typeof prefixStringOrUndefinedOption === "string")
    {
        return new DefinedOption(
            undefinedOption( prefixStringOrUndefinedOption,
                             valueStringOrDescription ?? ""),
                             nameOrDescription ?? "",
                             name ?? "" );
    }

    return new DefinedOption( prefixStringOrUndefinedOption, valueStringOrDescription ?? "", nameOrDescription ?? "");
}

export {definedOption as default};
