import {type StringOrStringSet} from "./string-or-string-set.js";
import { inspect } from "util";

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

    public equals(obj: unknown): boolean
    {
        if (this === obj) { return true; }
        if ( ! (obj instanceof ArgString)) { return false; }

        if (this.#prefix instanceof Set && obj.#prefix instanceof Set)
        {
            if (this.#value !== obj.#value || this.#prefix.size !== obj.#prefix.size)
            {
                return false;
            }

            for (const prefixString of this.#prefix)
            {
                if ( ! obj.#prefix.has(prefixString))
                {
                    return false;
                }
            }

            return true;
        }
        else
        {
            return this.#prefix === obj.#prefix && this.#value === obj.#value;
        }
    }

    public abstract toString(): string;

    public abstract [inspect.custom](): string;
}

export {ArgString as default};
