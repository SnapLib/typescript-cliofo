import {ConsumerRangeError} from "./consumer-range-error.js";
import {CliofoType} from "./cliofo-type.js";

/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a predicate used to validate
 * consumed strings.
 */
export class ConsumerString
{
    /**
     * The `string` argument value of this `StringConsumer`.
     *
     * @public
     * @readonly
     */
    public readonly stringValue: string;

    /**
     * The command line operand, flag, or option type that this object consumes.
     *
     * @public
     * @readonly
     */
    public readonly consumableCliofoType: CliofoType;

    /**
     * The required minimum number of arguments and maximum number of arguments
     * this `StringConsumer` can consume.
     *
     * @public
     * @readonly
     */
    public readonly range: Readonly<{min: number, max: number}>;

    /**
     * `true` if this object's validator `string` predicate is not the
     * default `string` predicate.
     *
     * @public
     * @readonly
     */
    public readonly hasStringPredicate: boolean;

    static readonly #defaultStringPredicate = () => false;

    readonly #stringPredicate: (aString: string) => boolean;

    /**
     * Constructs an instance of a {@link ConsumerString} object. This object
     * represents a string on the command line that can consume other strings.
     *
     * @param stringValue The `string` that's going to consume other `string`s.
     *
     * @param range The minimum and maximum number of `string` arguments this
     *              object requires to consume.
     *
     * @param stringPredicate An optional `string` predicate that can be used to
     *                        validate a `string`.
     *
     * @throws {ConsumerRangeError} If range minimum and maximum values are
     *                              incompatible.
     */
    public constructor( stringValue: string,
                        cliofoType: CliofoType,
                        range: Partial<{min: number, max: number}> = {min: 0, max: 0},
                        stringPredicate: (aString: string) => boolean  = ConsumerString.#defaultStringPredicate)
    {
        const minRange: number = range.min === undefined || range.min === null
                                 ? 0 : range.min;

        const maxRange: number = range.min === undefined || range.min === null
                                 ? (range.max ?? 0) : (range.max ?? Infinity);

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

        this.stringValue = stringValue;
        this.consumableCliofoType = cliofoType;
        this.range = Object.freeze({min: minRange, max: maxRange});
        this.#stringPredicate = stringPredicate;
        this.hasStringPredicate = this.#stringPredicate !== ConsumerString.#defaultStringPredicate;
    }

    /**
     * Uses this object's internal `string` predicate to determine if the passed
     * `string` is valid.
     *
     * @remarks If no `string` validator is set, then all passed `string`
     *          arguments evaluate to `true`.
     *
     * @param aString The `string` to validate.
     *
     * @returns `true` if the passed string argument is valid.
     */
    public stringIsValid(aString: string): boolean
        { return this.#stringPredicate(aString); }

    /**
     * Returns the static default `string` predicate.
     *
     * @returns The static default `string` predicate.
     *
     * @protected
     * @static
     */
    protected static defaultStringPredicate(): () => boolean
        { return ConsumerString.#defaultStringPredicate; }
}

export {ConsumerString as default};

export {CliofoType} from "./cliofo-type.js";
