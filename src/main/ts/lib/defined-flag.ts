import { UndefinedFlag } from "./undefined-flag.js";

export class DefinedFlag extends UndefinedFlag
{
    readonly #description: string;
    readonly #name: string;

    public constructor(undefinedFlag: UndefinedFlag, description: string, name: string)
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

//TODO Add factory method.
