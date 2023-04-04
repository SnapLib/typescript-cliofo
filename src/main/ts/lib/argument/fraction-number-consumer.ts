import {NumberConsumer} from "./number-consumer.js";
import {type Range} from "./consumer/range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

const fractionNumberStringPredicate = Object.freeze(
    (aString: string) =>
    {
        if (aString.length < 2)
        {
            return false;
        }

        let decimalCharCount = 0;

        for (const char of aString)
        {
            if (char === "." && ++decimalCharCount === 2)
            {
                return false;
            }

            if (char !== "." && isNaN(Number(char)))
            {
                return false;
            }
        }

        return decimalCharCount === 1;
    });

export class FractionNumberConsumer extends NumberConsumer
{
    public constructor(
        stringValue: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<Range> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringFormatter: (aString: string) => string,
        stringToNumberConverter: (aString: string) => number,
        numberPredicate: (aNumber: number) => boolean )
    {
        super( stringValue,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               fractionNumberStringPredicate,
               stringFormatter,
               stringToNumberConverter,
               numberPredicate );
    }
}

export {FractionNumberConsumer as default};
