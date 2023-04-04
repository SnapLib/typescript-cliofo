import {NumberConsumer} from "./number-consumer.js";
import {stringIsFractionNumber} from "./consumer/predicate/string-is-fraction-number";
import {type Range} from "./consumer/range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

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
               stringIsFractionNumber,
               stringFormatter,
               stringToNumberConverter,
               numberPredicate );
    }
}

export {FractionNumberConsumer as default};
