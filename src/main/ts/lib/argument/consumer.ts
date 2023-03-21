import {ConsumerRange} from "./consumer/consumer-range.js";
import {type CliofoType, StringConsumer} from "./consumer/string-consumer.js";

export class Consumer<ConvertedStringType> extends StringConsumer
{
    readonly #stringConverter: (aString: string) => ConvertedStringType;

    readonly #convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    static readonly #defaultConvertedStringPredicate = () => false;

    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        rangeOrNumber: Partial<ConsumerRange> | number = StringConsumer.defaultRange(),
                        cliofoTypesToConsume: ReadonlySet<CliofoType> = StringConsumer.emptyCliofoTypeSet(),
                        stringPredicate: (aString: string) => boolean = StringConsumer.defaultStringPredicate(),
                        stringConverter: (aString: string) => ConvertedStringType,
                        convertedStringPredicate: (convertedString: ConvertedStringType) => boolean = Consumer.#defaultConvertedStringPredicate)
    {
        super(prefixString, nonPrefixedString, cliofoType, rangeOrNumber, cliofoTypesToConsume, stringPredicate);

        this.#stringConverter = stringConverter;

        this.#convertedStringPredicate = convertedStringPredicate;
    }

    /**
     * Passes the provided `string` to this object's {@link #stringConverter}
     * and returns the resulting {@link ConvertedStringType} instance.
     *
     * @param stringToConvert The `string` to be converted to the
     *        {@link ConvertedStringType} instance via this object's
     *        {@link #stringConverter}.
     *
     * @returns An instance of a {@link ConvertedStringType} returned after
     *          passing the provided `string` to this object's
     *          {@link #stringConverter}.
     */
    public convertString(stringToConvert: string): ConvertedStringType
        { return this.#stringConverter(stringToConvert); }

    /**
     * Getter for this object's {@link #stringConverter} property that contains
     * a function used to convert this object's {@link nonPrefixedString}
     * property to an instance of this object's {@link ConvertedStringType}.
     *
     * @returns This object's {@link #stringConverter} property.
     *
     * @public
     */
    public stringConverter(): (aString: string) => ConvertedStringType
        { return this.#stringConverter; }

    /**
     * Getter for this object's {@link #convertedStringPredicate} property that
     * contains the function that can be used to validate this object's {@link nonPrefixedString}
     * property to an instance of this object's {@link ConvertedStringType}.
     *
     * Getter for this object's {@link #convertedStringPredicate} property.
     *
     * @returns This object's {@link #convertedStringPredicate} property.
     *
     * @public
     */
    public convertedStringPredicate(): (convertedString: ConvertedStringType) => boolean
        { return this.#convertedStringPredicate; }

    /**
     * Returns `true` if this object's {@link #convertedStringPredicate}
     * property is not set to the default converted string predicate.
     *
     * @returns `true` if this object's converted string predicate property is
     *          not `undefined`.
     *
     * @public
     */
    public hasConvertedStringPredicate(): boolean
        { return this.#convertedStringPredicate === Consumer.#defaultConvertedStringPredicate; }

    /**
     * Returns the static default converted string predicate.
     *
     * @returns The static default converted string predicate.
     *
     * @protected
     * @static
     */
    protected static defaultConvertedStringPredicate(): () => boolean
        { return Consumer.#defaultConvertedStringPredicate; }
}

export const stringConsumerToTypeConsumer = <ConvertedStringType>(
    stringConsumer: Readonly<StringConsumer>,
    stringConverter: (aString: string) => ConvertedStringType,
    convertedStringPredicate?: (convertedString: ConvertedStringType) => boolean
): Consumer<ConvertedStringType> =>
    { return new Consumer( stringConsumer.prefixString,
                               stringConsumer.nonPrefixedString,
                               stringConsumer.cliofoType,
                               stringConsumer.range,
                               stringConsumer.cliofoTypesToConsume,
                               stringConsumer.stringPredicate,
                               stringConverter,
                               convertedStringPredicate); };

export {Consumer as default};
