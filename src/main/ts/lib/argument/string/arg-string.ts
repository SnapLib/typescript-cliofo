import { inspect } from "util";

export type StringOrStringSet = string | ReadonlySet<string>;

export abstract class ArgString<PrefixType extends StringOrStringSet>
{
    readonly #prefix: PrefixType;
    readonly #value: string;

    protected constructor(prefix: NonNullable<PrefixType>, value: NonNullable<string>)
    {
        if (prefix === undefined || prefix === null)
        {
            throw new Error(`${this.constructor.name}: ${prefix} prefix.`);
        }

        if (value === undefined || value === null)
        {
            throw new Error(`${this.constructor.name}: ${value} value.`);
        }

        this.#prefix = prefix;
        this.#value = value;
    }

    public get prefix(): PrefixType { return this.#prefix; }
    public get value(): string { return this.#value; }
    public abstract get prefixedValue(): PrefixType;

    public abstract equals(obj?: unknown): boolean;
    public abstract toString(): string;

    public abstract [inspect.custom](): string;
}

export {ArgString as default};
