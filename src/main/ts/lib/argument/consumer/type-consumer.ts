import {Range} from "./range.js";
import {CliofoType, UntypedStringConsumer} from "./untyped-string-consumer.js";

/**
 * A string that consumes a `string` argument and converts it to a type and can
 * contain a method used for validating that converted type.
 */
export abstract class TypeConsumer<ConvertedStringType> extends UntypedStringConsumer
{
    readonly #stringConverter: (aString: string) => ConvertedStringType;

    readonly #frozenStringConverter: (aString: string) => ConvertedStringType;

    readonly #convertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    readonly #frozenConvertedStringPredicate: (convertedString: ConvertedStringType) => boolean;

    /**
     * Constructs an instance of an object that is a `string` that consumes
     * another  `string`
     *
     * @param stringValue The `string` value of this `string` consuming `string`
     *     argument excluding leading prefix `string`.
     *
     * @param cliofoType The type of {@link CliofoType} this `string` consuming
     *     `string` argument is.
     *
     * @param rangeOrNumber The minimum and maximum number of `strings` this
     *     object is required and can consume or the number of arguments it's
     *     required to consume.
     *
     * @param cliofoTypesToConsume The operand, flag, and/or option strings this
     *     object consumes.
     *
     * @param stringPredicate A `string` predicate that can be used to validate
     *     consumed strings.
     *
     * @param stringConverter The function used to convert consumed strings to
     *     this object's type specified via its type parameter.
     *
     * @param convertedStringPredicate A predicate that can be used to validate
     *     consumed strings after they've been converted.
     *
     * @protected
     */
    protected constructor( stringValue: string,
                           cliofoType: CliofoType,
                           rangeOrNumber: Partial<Range> | number,
                           cliofoTypesToConsume: ReadonlySet<CliofoType>,
                           stringPredicate: (aString: string) => boolean,
                           stringFormatter: (aString: string) => string,
                           stringConverter: (aString: string) => ConvertedStringType,
                           convertedStringPredicate: (convertedString: ConvertedStringType) => boolean )
    {
        super(stringValue, cliofoType, rangeOrNumber, cliofoTypesToConsume, stringPredicate, stringFormatter);
        this.#stringConverter = stringConverter;
        this.#frozenStringConverter = Object.isFrozen(this.#stringConverter) ? this.#stringConverter : Object.freeze((aString: string) => this.#stringConverter(aString));
        this.#convertedStringPredicate = convertedStringPredicate;
        this.#frozenConvertedStringPredicate = Object.isFrozen(this.#convertedStringPredicate) ? this.#convertedStringPredicate : Object.freeze((convertedString: ConvertedStringType) => this.#convertedStringPredicate(convertedString));
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
     * Returns a frozen instance of this object's
     * {@link #frozenStringConverter} property that contains a function used to
     * convert this object's {@link stringValue} property to an instance of this
     * object's {@link ConvertedStringType}.
     *
     * @returns This object's {@link #frozenStringConverter} property.
     *
     */
    public stringConverter(): (aString: string) => ConvertedStringType
        { return this.#frozenStringConverter; }

    /**
     * Returns a frozen instance of this object's
     * {@link #frozenConvertedStringPredicate} property that contains the
     * function that can be used to validate consumed operand, flag, and/or
     * option `string` arguments that have been converted to this object's
     * {@link ConvertedStringType} type.
     *
     * @returns This object's {@link #frozenConvertedStringPredicate} property.
     *
     */
    public convertedStringPredicate(): (convertedString: ConvertedStringType) => boolean
        { return this.#frozenConvertedStringPredicate; }

    /**
     * Returns `true` if this object's {@link #convertedStringPredicate}
     * property is not set to the default converted string predicate.
     *
     * @returns `true` if this object's converted string predicate property is
     *          not `undefined`.
     *
     */
    public hasConvertedStringPredicate(): boolean
        { return this.#convertedStringPredicate !== TypeConsumer.alwaysFalsePredicate(); }
}

export {TypeConsumer as default};
