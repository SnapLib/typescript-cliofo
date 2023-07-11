export class FlagCharArray
{
    readonly #charsAndCodePoints: ReadonlySet<string | number>;
    readonly #chars: readonly string[];

    public constructor(charsOrCodePoints: ReadonlySet<string | number>);
    public constructor(flagCharArray: FlagCharArray);
    constructor(charAndCodePointSetOrFlagCharArray: ReadonlySet<string | number> | FlagCharArray)
    {
        if (! (charAndCodePointSetOrFlagCharArray instanceof FlagCharArray) )
        {
            this.#charsAndCodePoints = Object.isFrozen(charAndCodePointSetOrFlagCharArray) ? charAndCodePointSetOrFlagCharArray : Object.freeze(new Set(charAndCodePointSetOrFlagCharArray));

            const charOrCodePointArray: ReadonlyArray<string | number> = Object.freeze(Array.from(this.#charsAndCodePoints));

            const multiCharAndNonIntIndexes: ReadonlyArray<readonly number[]> =
                getMultiCharAndNonIntIndexes(charOrCodePointArray);

            if (multiCharAndNonIntIndexes[0].length !== 0)
            {
                throw new Error(`non single character string value${multiCharAndNonIntIndexes[0].length === 1 ? "" : "s"}: ${multiCharAndNonIntIndexes[0].map(i => charOrCodePointArray[i])}`);
            }
            else if (multiCharAndNonIntIndexes[1].length !== 0)
            {
                throw new Error(`non integer code point value${multiCharAndNonIntIndexes[1].length === 1 ? "" : "s"}: ${multiCharAndNonIntIndexes[1].map(i => charOrCodePointArray[i])}`);
            }

            this.#chars = Object.freeze(charOrCodePointArray.map(stringOrNumber => typeof stringOrNumber === "string" ? stringOrNumber : String.fromCodePoint(stringOrNumber)));
        }
        else
        {
            this.#charsAndCodePoints = charAndCodePointSetOrFlagCharArray.#charsAndCodePoints;
            this.#chars = charAndCodePointSetOrFlagCharArray.#chars;
        }
    }

    public get charsAndCodePoints(): ReadonlySet<string | number> { return this.#charsAndCodePoints; }
    public get chars(): readonly string[] { return this.#chars; }
}

export function flagCharArray(charSet: ReadonlySet<string>): FlagCharArray;
export function flagCharArray(charArray: ReadonlyArray<string>): FlagCharArray;
export function flagCharArray(codePointSet: ReadonlySet<number>): FlagCharArray;
export function flagCharArray(codePointArray: ReadonlyArray<number>): FlagCharArray;
export function flagCharArray(flagCharArray: FlagCharArray): FlagCharArray;
export function flagCharArray(charAndCodePointSetOrFlagCharArray: ReadonlySet<string | number> | ReadonlyArray<string | number> | FlagCharArray): FlagCharArray
{
    if (charAndCodePointSetOrFlagCharArray instanceof Set)
    {
        return new FlagCharArray(charAndCodePointSetOrFlagCharArray);
    }

    if (charAndCodePointSetOrFlagCharArray instanceof FlagCharArray)
    {
        return new FlagCharArray(charAndCodePointSetOrFlagCharArray);
    }

    return new FlagCharArray(new Set(charAndCodePointSetOrFlagCharArray));
}

function getMultiCharAndNonIntIndexes(stringOrNumberSet: ReadonlyArray<string | number>): ReadonlyArray<readonly number[]>
{
    return Object.freeze([...stringOrNumberSet].reduce(
        (indexesArray: ReadonlyArray<readonly number[]>, stringOrNumber: string | number, index: number) =>
            typeof stringOrNumber === "string" && stringOrNumber.length !== 1
                ? Object.freeze([Object.freeze(indexesArray[0].concat(index)), indexesArray[1]])
            : ! Number.isInteger(stringOrNumber)
                ? Object.freeze([indexesArray[0], Object.freeze(indexesArray[1].concat(index))])
            : indexesArray,
        Object.freeze([Object.freeze([]),Object.freeze([])])
    ));
}
