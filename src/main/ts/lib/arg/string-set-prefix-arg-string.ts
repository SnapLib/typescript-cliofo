import { ArgString } from "./arg-string";
import { inspect } from "util";

const stringToString = (aString: string): string => aString.length != 1 ? `"${aString}"` : `'${aString}'`;
const stringArrayToString = (strings: ReadonlyArray<string>) => `[${strings.map(aString => stringToString(aString)).join(", ")}]`;

export class StringSetPrefixArgString extends ArgString<ReadonlySet<string>>
{
    readonly #prefixesArray: ReadonlyArray<string>;
    readonly #prefixedValue: ReadonlySet<string>;
    readonly #prefixedValuesArray: ReadonlyArray<string>;
    readonly #string: string;

    public constructor(prefix: NonNullable<ReadonlySet<string>>, value: NonNullable<string>)
    {
        super(prefix, value);
        this.#prefixesArray = Object.freeze(Array.from(super.prefix));
        this.#prefixedValue = Object.freeze(new Set(this.#prefixesArray.map(prefixString => prefixString + value)));
        this.#prefixedValuesArray = Object.freeze(Array.from(this.#prefixedValue));
        this.#string = `${this.constructor.name} {prefixes: ${stringArrayToString(this.#prefixedValuesArray)}, value: ${stringToString(super.value)}}`;
    }

    public get prefixedValue(): ReadonlySet<string> { return this.#prefixedValue; }

    public prefixes(): ReadonlyArray<string> { return this.#prefixesArray; }
    public prefixedValues(): ReadonlyArray<string> { return this.#prefixedValuesArray; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}
