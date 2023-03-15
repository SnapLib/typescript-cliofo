import {ConsumerRangeError} from "./consumer-range-error.js";
import {type CliofoType} from "../../cliofo-type.js";
import {StringArgument} from "../string-argument.js";

/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a predicate used to validate
 * consumed strings.
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

    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        cliofoTypeToConsume: CliofoType,
                        range: Partial<{min: number, max: number}> = {min: 0, max: 0},
                        stringPredicate: (aString: string) => boolean  = StringConsumer.#defaultStringPredicate)
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

    public stringPredicate(): (aString: string) => boolean
        { return this.#stringPredicate; }

    public hasStringPredicate(): boolean
        { return this.#stringPredicate !== StringConsumer.#defaultStringPredicate; }

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
        { return StringConsumer.#defaultStringPredicate; }
}

export {StringConsumer as default};

export {CliofoType} from "../../cliofo-type.js";
