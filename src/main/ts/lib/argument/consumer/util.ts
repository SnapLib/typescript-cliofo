export class ConsumerRange
{
    readonly min: number;
    readonly max: number;

    public constructor(range: Range);
    public constructor(min: number, max: number);
    constructor(rangeOrNumber: Range | number, max?: number)
    {
        this.min = typeof rangeOrNumber === "number"
                   ? rangeOrNumber
                   : rangeOrNumber.min  ?? 0 ;

        // if min and max range are undefined, set max range to 0, otherwise
        // set to infinity if only max range is undefined
        this.max = typeof rangeOrNumber === "number"
            ? rangeOrNumber
            : rangeOrNumber.max ?? (    rangeOrNumber.min === undefined
                                     && rangeOrNumber.min === null
                                     ? 0 : Infinity );
    }

}

type Range = {readonly min?: number, readonly max?: number;};
