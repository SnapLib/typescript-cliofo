const EMPTY_STRING: string = "";

const stringToString = (aString: string) => aString.length != 1 ? `"${aString}"` : `'${aString}'`;

export class ArgumentString
{
    readonly #prefixString: string;
    readonly #valueString: string;
    readonly #prefixedValueString: string;
    readonly #string: string;

    public constructor( other: NonNullable<ArgumentString> );
    public constructor( prefixString: NonNullable<string>,
                        valueString: NonNullable<string> );
    constructor(prefixOrOther: NonNullable<string | ArgumentString>, valueString?: string)
    {
        if (prefixOrOther instanceof ArgumentString)
        {
            this.#prefixString = prefixOrOther.#prefixString;
            this.#valueString = prefixOrOther.#valueString;
            this.#prefixedValueString = prefixOrOther.#prefixedValueString;
        }
        else
        {
            if (valueString)
            {
                this.#prefixString = prefixOrOther;
                this.#valueString = valueString;
                this.#prefixedValueString = prefixOrOther + valueString;
            }
            else
            {
                throw new TypeError(`${ArgumentString.name} constructor undefined or null value string`);
            }
        }

        this.#string = `${ArgumentString.name} {prefix: ${stringToString(this.#prefixString)}, value: ${stringToString(this.#valueString)}}`;
    }

    public get prefixString() { return this.#prefixString; }
    public get valueString() { return this.#valueString; }
    public get stringValue() { return this.#prefixedValueString; }


    public equals(obj: unknown): boolean
    {
        return obj instanceof ArgumentString
            && this.#prefixString === obj.#prefixString
            && this.#valueString === obj.#valueString;
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
