import {TypeConsumer} from "./consumer/type-consumer.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";
import {type Range} from "./consumer/range.js";
import {resolve} from "node:path";

export class PathStringConsumer extends TypeConsumer<string>
{
    public constructor(
        stringValue: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<Range> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringPredicate: (aString: string) => boolean,
        stringFormatter: (aString: string) => string
    )
    {
        super( stringValue,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               stringPredicate,
               stringFormatter,
               resolve,
               stringPredicate );
    }
}

export {PathStringConsumer as default};
