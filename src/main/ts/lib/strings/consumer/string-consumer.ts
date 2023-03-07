/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a predicate used to validate
 * consumed strings.
 *
 * @remarks There's no checks or validations performed on the min and max
 *          values to make sure they're compatible and they're both explicitly
 *          required to be set. The {@link createStringConsumer} function offers
 *          a safer way to construct instances of this object.
 */
export class StringConsumer
{
    /**
     * The `string` argument value of this `StringConsumer`.
     * @readonly
     */
    public readonly stringValue: string;

    /**
     * The required minimum number of arguments and maximum number of arguments
     * this `StringConsumer` can consume.
     * @readonly
     */
    public readonly range: Readonly<{min: number, max: number}>;

    static readonly #defaultStringPredicate = () => false;

    readonly #stringPredicate: (aString: string) => boolean;

    /**
     * Constructs an instance of a {@link StringConsumer} object. This object
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
                        range: Readonly<{min: number, max: number}>,
                        stringPredicate: (aString: string) => boolean  = StringConsumer.#defaultStringPredicate)
    {
        this.stringValue = stringValue;
        this.range = Object.isFrozen(range) ? range : Object.freeze({min: range.min, max: range.max});
        this.#stringPredicate = stringPredicate;
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
     * Returns `true` if this object's validator `string` predicate is not the
     * default `string` predicate.
     *
     * @returns `true` if this object's validator `string` predicate is not the
     *          default `string` predicate.
     */
    public hasValidatorStringPredicate(): boolean
    {
        return this.#stringPredicate !== StringConsumer.#defaultStringPredicate;
    }

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

/**
 * Function to construct a new {@link StringConsumer} instance that will require
 * the number of string arguments to consume based on the passed number argument.
 *
 * @remarks
 * - A string consumer can require 0 string arguments.
 *
 * @param stringValue The `string` value of the constructed `StringConsumer`.
 *
 * @param requiredNumOfArgsToConsume The number of string arguments the
 * instantiated object requires.
 *
 * @returns A newly instantiated {@link StringConsumer} object that will require
 *          the specified number of string arguments.
 */
export function createStringConsumer(stringValue: string, requiredNumOfArgsToConsume: number): Readonly<StringConsumer>;

/**
 * Constructs a new {@link StringConsumer} object instance with the provided
 * string value minimum `range.min` and maximum `range.max` consumable range
 * values.
 *
 * @param stringValue The `string` value of the constructed `StringConsumer`.
 *
 * @param range The minimum and maximum consumable range values.
 *
 * @returns a new {@link StringConsumer} object instance with the provided string
 * value minimum `range.min` and maximum `range.max` consumable range values.
 */
export function createStringConsumer(stringValue: string, range: Partial<{min: number | null, max: number | null}>): Readonly<StringConsumer>;

/**
 * Function to construct a new {@link StringConsumer} instance with the provided
 * minimum number of required string arguments to consume and maximum number of
 * string arguments that can be consumed.
 *
 * @remarks
 * - If the min and max arguments are equal then the constructed `StringConsumer`
 *   will require that exact number of requirements.
 *
 * - A string consumer can require/consume 0 or 0 or more arguments.
 *
 * @param stringValue The `string` value of the constructed `StringConsumer`.
 *
 * @param min Denotes the minimum required number of arguments the constructed
 *            `StringConsumer` will require.
 *
 * @param max The `max` argument denotes the maximum number of arguments the
 *            constructed `StringConsumer`can consume.
 *
 * @returns A newly instantiated {@link StringConsumer} object constructed from
 *          the min required and max consumable string arguments.
 */
export function createStringConsumer(stringValue: string, min: number, max: number): Readonly<StringConsumer>;

export function createStringConsumer(stringValue: string, minOrRange: number | Partial<{min: number | null, max: number | null}>, max?: number): Readonly<StringConsumer>
{
    let minRange: number;

    let maxRange: number;

    if (typeof minOrRange === "number")
    {
        minRange = minOrRange;
        maxRange = max ?? minRange;
    }
    else
    {
        if (minOrRange.min === undefined || minOrRange.min === null)
        {
            minRange = 0;
            maxRange = minOrRange.max ?? 0;
        }
        else
        {
            minRange = minOrRange.min;
            maxRange = minOrRange.max ?? Infinity;
        }
    }


    if (minOrRange > maxRange)
    {
        throw new Error(`min range greater than max range: ${minOrRange} > ${maxRange}`);
    }

    if (maxRange < 0)
    {
        throw new Error(`max range less than 0: ${maxRange} < 0`);
    }

    return Object.freeze(new StringConsumer(stringValue, {min: minRange, max: maxRange}));

}

export {createStringConsumer as default};
