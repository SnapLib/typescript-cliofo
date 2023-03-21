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

export const createStringConsumer = (
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<ConsumerRange> | number = StringConsumer.zeroRange(),
    cliofoTypesToConsume: ReadonlySet<CliofoType> = StringConsumer.emptyCliofoTypeSet(),
    stringPredicate: (aString: string) => boolean = StringConsumer.alwaysFalsePredicate(),
    stringConverter: (aString: string) => string = StringConsumer.stringIdentityFunction(),
    convertedStringPredicate: (aString: string) => boolean = StringConsumer.defaultConvertedStringPredicate()
): StringConsumer =>
    new StringConsumer(
        prefixString,
        nonPrefixedString,
        cliofoType,
        rangeOrNumber,
        cliofoTypesToConsume,
        stringPredicate,
        stringConverter,
        convertedStringPredicate
    );

export {StringConsumer as default};
