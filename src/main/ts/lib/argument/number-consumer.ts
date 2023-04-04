import {type Range} from "./consumer/range.js";
import {TypeConsumer} from "./consumer/type-consumer.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

export class NumberConsumer extends TypeConsumer<number>
{
    public constructor(
        stringValue: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<Range> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringPredicate: (aString: string) => boolean,
        stringFormatter: (aString: string) => string,
        stringToNumberConverter: (aString: string) => number,
        numberPredicate: (aNumber: number) => boolean )
    {
        super( stringValue,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               stringPredicate,
               stringFormatter,
               stringToNumberConverter,
               numberPredicate );
    }
}

export {NumberConsumer as default};
