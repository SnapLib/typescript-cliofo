import {ConsumerString} from "./consumer-string.js";
import {type CliofoType} from "../cliofo-type.js";

export class TypeConsumer<ConvertedStringType> extends ConsumerString
{
    readonly #stringConverter: (aString: string) => ConvertedStringType;

    readonly #convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    static readonly #defaultConvertedStringPredicate = () => false;

    public constructor( stringValue: string,
                        cliofoTypeToConsume: CliofoType,
                        range: Readonly<{min: number, max: number}>,
                        stringConverter: (aString: string) => ConvertedStringType,
                        stringPredicate: (aString: string) => boolean = ConsumerString.defaultStringPredicate(),
                        convertedStringPredicate: (convertedString: ConvertedStringType) => boolean = TypeConsumer.#defaultConvertedStringPredicate )
    {
        super(stringValue, cliofoTypeToConsume, range, stringPredicate);
        this.#stringConverter = stringConverter;
        this.#convertedStringPredicate = convertedStringPredicate;
    }

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
    public convertString(aString: string): ConvertedStringType
        { return this.#stringConverter(aString); }

        /**
         * Uses this object's internal converted `string` predicate to determine
         * if the passed `string` is valid.
         *
         * @param convertedString The converted `string` to test for validity.
         *
         * @returns the resulting `boolean` from passing the converted `string`
         * argument to this object's internal converted `string` predicate.
         */
    public convertedStringIsValid(convertedString: ConvertedStringType)
        { return this.#convertedStringPredicate(convertedString); }

    /**
     * Returns `true` if this object's converted string predicate is not the
     * default converted string predicate.
     *
     * @returns `true` if this object's converted string predicate is not the
     *          default converted string predicate.
     */
    public hasConvertedStringPredicate(): boolean
        { return this.#convertedStringPredicate !== TypeConsumer.#defaultConvertedStringPredicate; }

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

export {CliofoType} from "../cliofo-type.js";
