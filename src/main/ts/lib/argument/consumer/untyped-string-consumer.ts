import {ConsumerRange} from "./consumer-range.js";
import {type CliofoType} from "../../cliofo-type.js";
import {StringArgument} from "../string-argument.js";

/**
 * A frozen instance of a {@link ConsumerRange} object with it's maximum and
 * minimum values set to `0`.
 *
 * @constant
 */
const consumerRangeSetToZero: Readonly<ConsumerRange> = Object.freeze(new ConsumerRange(0, 0));

/**
 * A frozen empty {@link CliofoType} set.
 *
 * @constant
 */
const emptyCliofoTypeSet: ReadonlySet<CliofoType> = Object.freeze(new Set<CliofoType>());

/**
 * A function that doesn't consume any arguments (ignores arguments during run
 * time) and returns `false`.
 *
 * @returns `false`
 *
 * @constant
 */
const alwaysFalseReturningFunc = Object.freeze(() => false);

/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments and can optionally contain a `string` predicate used to
 * validate consumed strings.
 */
export class UntypedStringConsumer extends StringArgument
{
    /**
     * Returns `true` if this object actually consumes strings. That is, if this
     * object:
     *
     * - consumes 1 or more type(s) of Cliofo arguments,
     * - has a max range greater than `0`, and
     * - has a `string` predicate set to a value other than the default string
     *   predicate.
     */
    public readonly consumesStrings: boolean;

    /**
     * The command line interface operand, flag, or option type(s) that this
     * object consumes.
     *
     * @public
     * @readonly
     */
    public readonly cliofoTypesToConsume: ReadonlySet<CliofoType>;

    /**
     * A `string` predicate that can be used to validate `string` arguments.
     *
     * @public
     * @readonly
     */
    public readonly stringPredicate: (aString: string) => boolean;

    /**
     * The required minimum number of arguments and maximum number of arguments
     * this object is required to and can consume.
     *
     * @property {number} range.min
     * - The minimum number of `string` arguments this object is required to
     *   consume. If the maximum range equals this property, this object will
     *   require that number of `string` arguments to consume.
     *
     * @property {number} range.min
     * - The maximum number of `string` arguments this object is capable of
     *   consuming. If minimum range equals this property, this object will
     *   require that number of `string` arguments to consume.
     *
     * @public
     * @readonly
     */
    public readonly range: Readonly<ConsumerRange>;

    static readonly #stringIdentityFunc: (aString: string) => string = (aString: string) => aString;

    /**
     * Constructs an instance of an object used to represent a `string` that can
     * consume or is required to consume a range of 0 or more `string` arguments
     * and can optionally contain a `string` predicate used to validate a
     * `string`.
     *
     * If the number of arguments to consume is set to `0` then the constructed
     * object won't consume any `string` arguments. Conversely, if set to
     * `Infinity`, then the constructed object can consume an indefinite amount
     * of `string` arguments. Setting this number below `0` or greater than
     * `Infinity` will cause an error to be thrown.
     *
     * The `string` predicate defaults to a method that doesn't consume any
     * arguments and returns `false`.
     *
     * The minimum and maximum range argument defaults to having both its
     * minimum and maximum ranges set to `0` and therefore does not consume any
     * `string` arguments. This is only the case if *both* minimum and maximum
     * range values aren't set or set to `undefined`. If one of them is set,
     * then that alters the unset range value's default value.
     *
     * Setting the minimum and maximum range values equal to each other will
     * construct an object that requires exactly that amount of `string`
     * arguments to consume.
     *
     * If no minimum and max range values are specified, then the constructed
     * object won't consume any `string` arguments (its max and min ranges are
     * both set to `0`).
     *
     * If only a minimum range value is specified, then the constructed
     * object will require *at least* that many `string` arguments to consume
     * (the max range defaults to `Infinity`).
     *
     * If only a maximum range value is specified, then the constructed
     * object can optionally consume up to that many `string` arguments (the
     * min range defaults to `0`).
     *
     * The following range values will result in an error to be thrown:
     *
     * Setting the minimum range to a value:
     *   - equal to or greater than `Infinity` or
     *   - greater than the maximum range value.
     *
     * Setting the maximum range to a value:
     *   - less than `0` or
     *   - less than the minimum range value.
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
     * @param rangeOrNumber A numeric range of `string` arguments this object
     *     can consume or exact `number` of `string` arguments the constructed
     *     object will require to consume.
     *
     * @param cliofoTypesToConsume The operand, option, or flag type the
     *                             constructed consumer consumes.
     *
     * @param stringPredicate a `string` predicate that can be used to validate
     *                        `string` arguments.
     *
     * @throws {ConsumerRangeError} If minimum and maximum range values aren't
     *                              valid. Such as a min range that's greater
     *                              than a max range.
     */
    public constructor( prefixString: string,
                        nonPrefixedString: string,
                        cliofoType: CliofoType,
                        rangeOrNumber: Partial<ConsumerRange> | number,
                        cliofoTypesToConsume: ReadonlySet<CliofoType>,
                        stringPredicate: (aString: string) => boolean )
    {
        super(prefixString, nonPrefixedString, cliofoType);

        this.cliofoTypesToConsume = Object.isFrozen(cliofoTypesToConsume)
            ? cliofoTypesToConsume
            : Object.freeze(new Set(cliofoTypesToConsume));

        if (typeof rangeOrNumber === "number")
        {
            this.range = Object.freeze(new ConsumerRange(rangeOrNumber, rangeOrNumber));
        }
        else if (rangeOrNumber instanceof ConsumerRange)
        {
            this.range = Object.isFrozen(rangeOrNumber) ? rangeOrNumber
                : Object.freeze(new ConsumerRange(
                   rangeOrNumber.min ?? 0,
                   rangeOrNumber.min === undefined
                       && rangeOrNumber.min === null
                           ? 0
                           : Infinity
                  ));
        }
        else
        {
            throw new Error();
        }

        this.stringPredicate = stringPredicate;

        // If this object consumes 1 or more CliofoTypes, has max range greater
        // than 0, and has a set string predicate.
        this.consumesStrings =    this.cliofoTypesToConsume.size !== 0
                               && this.range.max > 0
                               && this.stringPredicate !== alwaysFalseReturningFunc;
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
        { return this.stringPredicate(aString); }

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
        { return this.stringPredicate !== alwaysFalseReturningFunc; }

    /**
     * Returns an empty `Set<`{@link CliofoType}`>` used as this class' default
     * {@link cliofoTypesToConsume} property value. This creates a
     * {@link UntypedStringConsumer} that doesn't consume any `string` arguments.
     *
     * @returns The static default `{min: number, max: number}` range object.
     *
     * @public
     * @static
     */
    public static emptyCliofoTypeSet(): ReadonlySet<CliofoType>
        { return emptyCliofoTypeSet; }

    /**
     * Returns the {@link ConsumerRange} object used as this class' default
     * {@link range} property value which consists of a range with both its
     * minimum and maximum values set to `0`. This creates a
     * {@link UntypedStringConsumer} that doesn't consume any `string` arguments.
     *
     * @returns The {@link ConsumerRange} object used as this class' default
     *          {@link range} property.
     *
     * @public
     * @static
     */
    public static zeroRange(): Readonly<ConsumerRange>
        { return consumerRangeSetToZero; }

    /**
     * Returns the static default `string` predicate which consists of a
     * predicate that consumes no arguments and returns `false` effectively
     * treating every passed argument as invalid.
     *
     * @remarks This function does not take in any arguments. Or more accurately
     *     it ignores them at runtime.
     *
     * @returns The static default `string` predicate.
     *
     * @public
     * @static
     */
    public static alwaysFalsePredicate(): () => boolean
        { return alwaysFalseReturningFunc; }

    /**
     * Returns the static default `string` predicate which consists of a
     * predicate that consumes no arguments and returns `false` effectively
     * treating every passed argument as invalid.
     *
     * @returns The static default `string` predicate.
     *
     * @public
     * @static
     */
    public static stringIdentityFunction(): (aString: string) => string
        { return this.#stringIdentityFunc; }
}

export function untypedStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<ConsumerRange> | number = UntypedStringConsumer.zeroRange(),
    cliofoTypesToConsume: ReadonlySet<CliofoType> = UntypedStringConsumer.emptyCliofoTypeSet(),
    stringPredicate: (aString: string) => boolean = UntypedStringConsumer.alwaysFalsePredicate()
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( prefixString,
                                      nonPrefixedString,
                                      cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate );
}

export function stringArgumentToStringConsumer(
    stringArgument: Readonly<StringArgument>,
    rangeOrNumber: Partial<ConsumerRange> | number = UntypedStringConsumer.zeroRange(),
    cliofoTypesToConsume: ReadonlySet<CliofoType> = UntypedStringConsumer.emptyCliofoTypeSet(),
    stringPredicate: (aString: string) => boolean = UntypedStringConsumer.alwaysFalsePredicate()
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( stringArgument.prefixString,
                                      stringArgument.nonPrefixedString,
                                      stringArgument.cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate );
}

export {UntypedStringConsumer as default};

export {CliofoType} from "../../cliofo-type.js";