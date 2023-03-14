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
                        range: Readonly<{min: number, max: number}>,
                        stringConverter: (aString: string) => ConvertedStringType,
                        stringPredicate: (aString: string) => boolean = StringConsumer.defaultStringPredicate(),
                        convertedStringPredicate: (convertedString: ConvertedStringType ) => boolean = TypeConsumer.#defaultConvertedStringPredicate )
    {
        super(prefixString, nonPrefixedString, cliofoType, cliofoTypeToConsume, range, stringPredicate);
        this.#stringConverter = stringConverter;
        this.#convertedStringPredicate = convertedStringPredicate;
    }

    public stringConverter(): (aString: string) => ConvertedStringType
        { return this.#stringConverter; }

    public convertedStringPredicate(): (convertedString: ConvertedStringType) => boolean
        { return this.#convertedStringPredicate; }

    /**
     * Passes the provided `string` to this object's {@link #stringConverter} and
     * returns the resulting {@link ConvertedStringType} instance.
     *
     * @param aString The `string` to be converted to the {@link ConvertedStringType}
     *        instance via this object's {@link #stringConverter}.
     *
     * @returns An instance of a {@link ConvertedStringType} returned after
     *          passing the provided `string` to this object's
     *          {@link #stringConverter}.
     */
    public converterString(stringToConvert: string): ConvertedStringType
        { return this.#stringConverter(stringToConvert); }
}

export {TypeConsumer as default};
