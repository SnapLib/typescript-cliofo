import { ArgString } from "./arg-string";
import { inspect } from "util";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export class StringPrefixArgString extends ArgString<string>
{
    readonly #prefixedValue: string;
    readonly #string: string;

    public constructor(prefix: NonNullable<string>, value: NonNullable<string>)
    {
        super(prefix, value);
        this.#prefixedValue = super.prefix + super.value;
        this.#string = `${this.constructor.name} {prefix: ${stringToString(super.prefix)}, value: ${stringToString(super.value)}}`;
    }

    public get prefixedValue(): string { return this.#prefixedValue; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}
