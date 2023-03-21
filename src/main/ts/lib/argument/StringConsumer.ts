import {Consumer} from "./consumer.js";
import {type ConsumerRange} from "./consumer/consumer-range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

export class StringConsumer extends Consumer<string>
{
    public constructor(
        prefixString: string,
        nonPrefixedString: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<ConsumerRange> | number = Consumer.zeroRange(),
        cliofoTypesToConsume: ReadonlySet<CliofoType> = Consumer.emptyCliofoTypeSet(),
        stringPredicate: (aString: string) => boolean = Consumer.alwaysFalseStringPredicate(),
        stringConverter: (aString: string) => string = Consumer.stringIdentityFunction(),
        convertedStringPredicate: (aString: string) => boolean = Consumer.defaultConvertedStringPredicate()
    )
    {
        super( prefixString,
               nonPrefixedString,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               stringPredicate,
               stringConverter,
               convertedStringPredicate );
    }
}

export {StringConsumer as default};
