import {ConsumerRange} from "./consumer/consumer-range.js";
import {type CliofoType, UnTypedStringConsumer} from "./consumer/untyped-string-consumer.js";

export abstract class Consumer<ConvertedStringType> extends UnTypedStringConsumer
{
    readonly #stringConverter: (aString: string) => ConvertedStringType;

    readonly #convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    static readonly #defaultConvertedStringPredicate = () => false;

    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        rangeOrNumber: Partial<ConsumerRange> | number = UnTypedStringConsumer.zeroRange(),
                        cliofoTypesToConsume: ReadonlySet<CliofoType> = UnTypedStringConsumer.emptyCliofoTypeSet(),
                        stringPredicate: (aString: string) => boolean = UnTypedStringConsumer.alwaysFalseStringPredicate(),
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

export {Consumer as default};
