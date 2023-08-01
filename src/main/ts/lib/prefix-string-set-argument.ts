import { inspect } from "util";

export class PrefixStringSetArgument
{
    readonly #prefixes: readonly string[];
    readonly #value: string;
    readonly #prefixedValues: readonly string[];
    readonly #string: string;

    public constructor(prefixes: NonNullable<ReadonlySet<string>>, value: NonNullable<string>)
    {
        if (prefixes === undefined || prefixes === null)
        {
            throw new Error(`${this.constructor.name}: ${prefixes} prefixes.`);
        }

        if (value === undefined || value === null)
        {
            throw new Error(`${this.constructor.name}: ${value} value.`);
        }

        if (prefixes.has(""))
        {
            throw new Error(`${this.constructor.name}: prefixes contains empty string.`);
        }

        this.#prefixes = Object.freeze(Array.from(prefixes));
        this.#value = value;
        this.#prefixedValues = Object.freeze(this.#prefixes.map(prefixString => prefixString + this.#value));
        this.#string = `${this.constructor.name} {prefix: ${stringArrayToString(this.#prefixes)}, value: ${stringToString(this.#value)}}`;
    }

    public get prefixes(): readonly string[] { return this.#prefixes; }
    public get value(): string { return this.#value; }
    public get prefixedValues(): readonly string[] { return this.#prefixedValues; }

    public equals(obj: unknown): boolean
    {
        return this === obj || obj instanceof PrefixStringSetArgument
               && this.#prefixes === obj.#prefixes
               && this.#value === obj.#value;
    }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

const stringToString = function(aString: string): string {return aString.length !== 1 ? `"${aString}"` : `'${aString}'`;};
const stringArrayToString = function(strings: readonly string[]): string {return `[${strings.map(aString => stringToString(aString)).join(", ")}]`;};

export {PrefixStringSetArgument as default};
