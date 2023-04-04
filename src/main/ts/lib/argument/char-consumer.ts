import {TypeConsumer} from "./consumer/type-consumer.js";
import {type Range} from "./consumer/range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

const charStringPredicate = Object.freeze((aString: string) => aString.length === 1);

export class CharConsumer extends TypeConsumer<string>
{
    public constructor(
        stringValue: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<Range> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringPredicate: (aString: string) => boolean,
        stringFormatter: (aString: string) => string )
    {
        super( stringValue,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               charStringPredicate,
               stringFormatter,
               stringFormatter,
               stringPredicate );
    }
}

export {CharConsumer as default};
