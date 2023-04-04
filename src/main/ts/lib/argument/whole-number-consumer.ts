import {NumberConsumer} from "./number-consumer.js";
import {stringIsWholeNumber} from "./consumer/predicate/string-is-whole-number";
import {type Range} from "./consumer/range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

export class WholeNumberConsumer extends NumberConsumer
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
               stringIsWholeNumber,
               stringFormatter,
               stringToNumberConverter,
               numberPredicate );
    }
}

export {WholeNumberConsumer as default};
