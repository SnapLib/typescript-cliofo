import {ConsumerRangeError} from "./consumer-range-error.js";
import {type CliofoType} from "../../cliofo-type.js";
import {StringArgument} from "../string-argument.js";

/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a `string` predicate used to
 * validate consumed strings.
 */
export class StringConsumer extends StringArgument
{
    /**
     * The command line operand, flag, or option type that this object consumes.
     *
     * @public
     * @readonly
     */
    public readonly cliofoTypeToConsume: CliofoType;

    /**
     * The required minimum number of arguments and maximum number of arguments
     * this `StringConsumer` can consume.
     *
     * @public
     * @readonly
     */
    public readonly range: Readonly<{min: number, max: number}>;

    static readonly #defaultStringPredicate = () => false;

    readonly #stringPredicate: (aString: string) => boolean;

    /**
     * Constructs an instance of an object used to represent a `string` that can
     * consume or is required to consume a range of 0 or more `string` arguments
     * and can optionally contain a `string` predicate used to validate consumed
     * strings.
     *
     * @param prefixString The leading prefix `string` used to denote the
     *                     constructed consumer as an operand, flag, or option.
     *
     * @param nonPrefixedString The `string` value of the constructed consumer
     *                          excluding any prefix characters.
     *
     * @param cliofoType The operand, option, or flag type of the constructed
     *                   consumer.
     *
     * @param cliofoTypeToConsume The operand, option, or flag type the
     *                            constructed consumer consumes.
     *
     * @param range The minimum and max ranges the constructed consumer is
     *              required to and can consume.
     *
     * @param stringPredicate The `string` predicate that can be used to
     *                        validate consumed `string` arguments.
     *
     * @throws {ConsumerRangeError} If passed minimum and maximum range values
     *                              aren't valid. Such as a min range that's
     *                              greater than a max range.
     */
    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        cliofoTypeToConsume: CliofoType,
                        range: Partial<{min: number, max: number}> = {min: 0, max: 0},
                        stringPredicate: (aString: string) => boolean  = StringConsumer.#defaultStringPredicate )
    {
        super(prefixString, nonPrefixedString, cliofoType);

        const minRange: number = range.min ?? 0;

        const maxRange: number = range.max ?? (range.min === undefined || range.min === null ? 0 : Infinity);

        if (minRange >= Infinity)
        {
            throw new ConsumerRangeError(`min range greater than or equal to Infinity: ${minRange} >= Infinity`);
        }

        if (maxRange < 0)
        {
            throw new ConsumerRangeError(`max range less than 0: ${maxRange} < 0`);
        }

        if (minRange > maxRange)
        {
            throw new ConsumerRangeError(`min range greater than max range: ${minRange} > ${maxRange}`);
        }

        this.cliofoTypeToConsume = cliofoTypeToConsume;
        this.range = Object.freeze({min: minRange, max: maxRange});
        this.#stringPredicate = stringPredicate;
    }

    /**
     * Returns the result of passing the provided `string` argument to this
     * object's `string` validator.
     *
     * @remarks If no `string` validator is set, then all passed `string`
     *          arguments evaluate to `true`.
     *
     * @param aString The `string` to pass to this object's `string` validator.
     *
     * @returns The result of passing the provided `string` argument to this
     *          object's `string` validator.
     *
     * @public
     */
    public stringIsValid(aString: string): boolean
        { return this.#stringPredicate(aString); }

    /**
     * Getter for this object's {@link #stringPredicate} property.
     *
     * @returns This object's `string` predicate property.
     *
     * @public
     */
    public stringPredicate(): (aString: string) => boolean
        { return this.#stringPredicate; }

    /**
     * Returns true` if this object's `string` predicate property is not set to
     * the default `string` predicate.
     *
     * @returns `true` if this object's `string` predicate property is not set
     *           to the default `string` predicate.
     *
     * @public
     */
    public hasStringPredicate(): boolean
        { return this.#stringPredicate !== StringConsumer.#defaultStringPredicate; }

    /**
     * Returns the static default `string` predicate.
     *
     * @returns The static default `string` predicate.
     *
     * @protected
     * @static
     */
    protected static defaultStringPredicate(): () => boolean
        { return StringConsumer.#defaultStringPredicate; }
}

export {StringConsumer as default};

export {CliofoType} from "../../cliofo-type.js";
