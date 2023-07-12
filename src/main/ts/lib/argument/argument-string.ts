import {inspect, InspectOptions} from "util";

const EMPTY_STRING: string = "";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export class ArgumentString
{
    readonly #prefix: string;
    readonly #value: string;
    readonly #prefixedValue: string;
    readonly #jsonObj: Readonly<{prefix: string, value: string, prefixedValue: string}>;
    readonly #string: string;

    public constructor( prefixString: NonNullable<string>,
                        valueString: NonNullable<string> );
    public constructor( argumentString: NonNullable<ArgumentString> );
    constructor(prefixOrOther: NonNullable<string | ArgumentString>, valueString?: string)
    {
        if (prefixOrOther instanceof ArgumentString)
        {
            this.#prefix = prefixOrOther.#prefix;
            this.#value = prefixOrOther.#value;
            this.#prefixedValue = prefixOrOther.#prefixedValue;
        }
        else
        {
            if (valueString)
            {
                this.#prefix = prefixOrOther;
                this.#value = valueString;
                this.#prefixedValue = prefixOrOther + valueString;
            }
            else
            {
                throw new TypeError(`${ArgumentString.name} constructor undefined or null value string`);
            }
        }

        this.#jsonObj = Object.freeze({
            prefix: this.#prefix,
            value: this.#value,
            prefixedValue: this.#prefixedValue
        });
        this.#string = `${ArgumentString.name} {prefix: ${stringToString(this.#prefix)}, value: ${stringToString(this.#value)}}`;
    }

    public get prefix() { return this.#prefix; }
    public get value() { return this.#value; }
    public get prefixedValue() { return this.#prefixedValue; }

    public toJsonString(replacer?: Parameters<typeof JSON.stringify>[1], space?: string): string { return JSON.stringify(this.#jsonObj, replacer, space); }

    public equals(obj: unknown): boolean
    {
        return obj instanceof ArgumentString
            && this.#prefix === obj.#prefix
            && this.#value === obj.#value;
    }

    public toString(): string { return this.#string; }

    public [inspect.custom](depth: number, options: InspectOptions)
    {
        return this.#string;
    }
}

export function argumentString(prefixString?: string, value?: string ) : ArgumentString;
export function argumentString(other: ArgumentString ): ArgumentString;
export function argumentString(prefixStringOrOther?: string | ArgumentString, value?: string): ArgumentString
{
    if (prefixStringOrOther instanceof ArgumentString)
    {
        return new ArgumentString(prefixStringOrOther);
    }
    else
    {
        return new ArgumentString(prefixStringOrOther ?? EMPTY_STRING, value ?? EMPTY_STRING);
    }
}

export {argumentString as default};
