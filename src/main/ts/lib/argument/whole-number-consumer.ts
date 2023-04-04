import {NumberConsumer} from "./number-consumer.js";
import {type Range} from "./consumer/range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

const wholeNumberStringPredicate = Object.freeze((aString: string) => aString.length !== 0 && [...aString].every(char => ! isNaN(Number(char))));

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
               wholeNumberStringPredicate,
               stringFormatter,
               stringToNumberConverter,
               numberPredicate );
    }
}

export {WholeNumberConsumer as default};
