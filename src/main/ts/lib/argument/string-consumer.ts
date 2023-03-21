import {Consumer} from "./consumer.js";
import {type ConsumerRange} from "./consumer/consumer-range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

export class StringConsumer extends Consumer<string>
{
    public constructor(
        prefixString: string,
        nonPrefixedString: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<ConsumerRange> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringPredicate: (aString: string) => boolean,
        stringConverter: (aString: string) => string,
        convertedStringPredicate: (aString: string) => boolean )
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

export function createStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<ConsumerRange> | number = Consumer.zeroRange(),
    cliofoTypesToConsume: ReadonlySet<CliofoType> = Consumer.emptyCliofoTypeSet(),
    stringPredicate: (aString: string) => boolean = Consumer.alwaysFalsePredicate(),
    stringConverter: (aString: string) => string = Consumer.stringIdentityFunction(),
    convertedStringPredicate: (aString: string) => boolean = Consumer.alwaysFalsePredicate()
) : StringConsumer
    {
        return new StringConsumer( prefixString,
                                   nonPrefixedString,
                                   cliofoType,
                                   rangeOrNumber,
                                   cliofoTypesToConsume,
                                   stringPredicate,
                                   stringConverter,
                                   convertedStringPredicate );
    }

export {StringConsumer as default};
