/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a predicate used to validate
 * consumed strings.
 *
 * @remarks There's no checks or validations performed on the min and max
 *          values to make sure they're compatible and they're both explicitly
 *          required to be set. The {@link createConsumerString} function offers
 *          a safer way to construct instances of this object.
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
     */
    public constructor( stringValue: string,
                        range: Partial<{min: number, max: number}> = {min: 0, max: 0},
                        stringPredicate: (aString: string) => boolean  = ConsumerString.#defaultStringPredicate)
    {
        this.stringValue = stringValue;

        let minRange: number;

        let maxRange: number;

        if (range.min === undefined || range.min === null)
        {
            minRange = 0;
            maxRange = range.max ?? 0;
        }
        else
        {
            minRange = range.min;
            maxRange = range.max ?? Infinity;
        }

        if (minRange >= Infinity)
        {
            throw new Error(`min range greater than or equal to Infinity: ${minRange} >= Infinity`);
        }

        if (maxRange < 0)
        {
            throw new Error(`max range less than 0: ${maxRange} < 0`);
        }

        if (minRange > maxRange)
        {
            throw new Error(`min range greater than max range: ${minRange} > ${maxRange}`);
        }

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
