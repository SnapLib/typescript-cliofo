import {StringConsumer} from "./string-consumer";

export class TypeConsumer<ConvertedStringType> extends StringConsumer
{
    public readonly stringConverter: (aString: string) => ConvertedStringType;

    public readonly convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    static readonly #defaultConvertedStringPredicate = () => false;

    public constructor( stringValue: string,
                        range: Readonly<{min: number, max: number}>,
                        stringConverter: (aString: string) => ConvertedStringType,
                        stringPredicate: (aString: string) => boolean = StringConsumer.defaultStringPredicate(),
                        convertedStringPredicate: (convertedString: ConvertedStringType) => boolean = TypeConsumer.#defaultConvertedStringPredicate )
    {
        super(stringValue, range, stringPredicate);
        this.stringConverter = stringConverter;
        this.convertedStringPredicate = convertedStringPredicate;
    }

    /**
     * Passes the provided `string` to this object's {@link stringConverter} and
     * returns the resulting {@link ConvertedStringType} instance.
     *
     * @param aString The `string` to be converted to the {@link ConvertedStringType}
     *        instance via this object's {@link stringConverter}.
     *
     * @returns An instance of a {@link ConvertedStringType} returned after
     *          passing the provided `string` to this object's
     *          {@link stringConverter}.
     */
    public convertString(aString: string): ConvertedStringType
        { return this.stringConverter(aString); }

    public convertedStringIsValid(convertedString: ConvertedStringType)
        { return this.convertedStringPredicate(convertedString); }

    /**
     * Returns `true` if this object's converted string predicate is not the
     * default converted string predicate.
     *
     * @returns `true` if this object's converted string predicate is not the
     *          default converted string predicate.
     */
    public hasConvertedStringPredicate(): boolean
        { return this.convertedStringPredicate !== TypeConsumer.#defaultConvertedStringPredicate; }

    /**
     * Returns the static default {@link ConvertedStringType} predicate.
     *
     * @returns The static default {@link ConvertedStringType} predicate.
     *
     * @protected
     * @static
     */
    protected static defaultConvertedStringPredicate(): () => boolean
        { return TypeConsumer.#defaultConvertedStringPredicate; }
}

export {TypeConsumer as default};
