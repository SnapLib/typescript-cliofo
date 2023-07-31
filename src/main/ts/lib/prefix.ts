import { inspect } from "util";

export class Prefix
{
    readonly #flagChar: string;
    readonly #optionString: string;
    readonly #string: string;

    public constructor(flagCharOrCodePoint: NonNullable<string | number>)
    {
        if (flagCharOrCodePoint === undefined || flagCharOrCodePoint === null)
        {
            throw new Error("undefined or null flag char or code point.");
        }

        if (typeof flagCharOrCodePoint === "string")
        {
            if (flagCharOrCodePoint.length !== 1)
            {
                throw new Error(`Flag character doesn't consist of single character: "${flagCharOrCodePoint}"`);
            }

            this.#flagChar = flagCharOrCodePoint;
        }
        else
        {
            this.#flagChar = String.fromCodePoint(flagCharOrCodePoint);
        }

        this.#optionString = this.#flagChar.repeat(2);
        this.#string = `${this.constructor.name} {flagChar: '${this.#flagChar}', optionString: "${this.#optionString}"}`;
    }

    public get flagChar(): string { return this.#flagChar; }
    public get optionString(): string { return this.#optionString; }

    public toString(): string { return this.#string; }

    public [inspect.custom](): string { return this.#string; }
}

export function prefix(flagChar: NonNullable<string>): Readonly<Prefix>;
export function prefix(flagCodePoint: NonNullable<number>): Readonly<Prefix>;
export function prefix(flagCharOrCodePoint: NonNullable<string | number>): Readonly<Prefix>
{
    return Object.freeze(new Prefix(flagCharOrCodePoint));
}


export {prefix as default};
