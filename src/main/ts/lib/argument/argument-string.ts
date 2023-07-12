const EMPTY_STRING: string = "";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export class ArgumentString
{
    readonly #prefix: string;
    readonly #value: string;
    readonly #prefixedValue: string;
    readonly #string: string;

    public constructor( other: NonNullable<ArgumentString> );
    public constructor( prefixString: NonNullable<string>,
                        valueString: NonNullable<string> );
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

        this.#string = `${ArgumentString.name} {prefix: ${stringToString(this.#prefix)}, value: ${stringToString(this.#value)}}`;
    }

    public get prefix() { return this.#prefix; }
    public get value() { return this.#value; }
    public get prefixedValue() { return this.#prefixedValue; }


    public equals(obj: unknown): boolean
    {
        return obj instanceof ArgumentString
            && this.#prefix === obj.#prefix
            && this.#value === obj.#value;
    }

    public toString(): string { return this.#string; }
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
