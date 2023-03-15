import {StringConsumer} from "./string-consumer.js";
import {type CliofoType} from "./string-consumer.js";

export class TypeConsumer<ConvertedStringType> extends StringConsumer
{
    readonly #stringConverter: (aString: string) => ConvertedStringType;

    readonly #convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    static readonly #defaultConvertedStringPredicate = () => false;

    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        cliofoTypeToConsume: CliofoType,
                        range: Readonly<{min: number, max: number}> = StringConsumer.defaultRange(),
                        stringConverter: (aString: string) => ConvertedStringType,
                        stringPredicate: (aString: string) => boolean = StringConsumer.defaultStringPredicate(),
                        convertedStringPredicate: (convertedString: ConvertedStringType) => boolean = TypeConsumer.#defaultConvertedStringPredicate)
    {
        super(prefixString, nonPrefixedString, cliofoType, cliofoTypeToConsume, range, stringPredicate);
        this.#stringConverter = stringConverter;
        this.#convertedStringPredicate = convertedStringPredicate;
    }

    /**
     * Passes the provided `string` to this object's {@link #stringConverter}
     * and returns the resulting {@link ConvertedStringType} instance.
     *
     * @param aString The `string` to be converted to the {@link ConvertedStringType}
     *        instance via this object's {@link #stringConverter}.
     *
     * @returns An instance of a {@link ConvertedStringType} returned after
     *          passing the provided `string` to this object's
     *          {@link #stringConverter}.
     */
    public convertString(stringToConvert: string): ConvertedStringType
        { return this.#stringConverter(stringToConvert); }

    /**
     * Getter for this object's {@link #stringConverter} property.
     *
     * @returns This object's {@link #stringConverter} property.
     *
     * @public
     */
    public stringConverter(): (aString: string) => ConvertedStringType
        { return this.#stringConverter; }

    /**
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
        { return this.#convertedStringPredicate === TypeConsumer.#defaultConvertedStringPredicate; }

    /**
     * Returns the static default converted string predicate.
     *
     * @returns The static default converted string predicate.
     *
     * @protected
     * @static
     */
    protected static defaultConvertedStringPredicate(): () => boolean
        { return TypeConsumer.#defaultConvertedStringPredicate; }
}

export {TypeConsumer as default};
