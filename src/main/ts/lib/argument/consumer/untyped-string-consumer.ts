import {ConsumerRange} from "./consumer-range.js";
import {type CliofoType} from "../../cliofo-type.js";
import {StringArgument} from "../string-argument.js";

/**
 * A function that takes 1 `string` argument and returns the passed `string`
 * argument.
 *
 * @param aString The `string` value that is returned.
 *
 * @returns the passed `string` argument.
 *
 * @constant
 */
const stringIdentityFunction = Object.freeze((aString: string) => aString);

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
 * `string` arguments and can optionally contain a `string` predicate and
 * formatter used to validate and format consumed strings.
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

    /**
     * A `string` predicate that can be used to validate `string` arguments.
     *
     * @readonly
     */
    readonly #stringPredicate: (aString: string) => boolean;

    readonly #stringFormatter: (aString: string) => string;

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
                        stringPredicate: (aString: string) => boolean,
                        stringFormatter: (aString: string) => string )
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

        this.#stringPredicate = Object.isFrozen(stringPredicate) ? stringPredicate
            : Object.freeze(aString => stringPredicate(aString));

        this.#stringFormatter = Object.isFrozen(stringFormatter) ? stringFormatter
            : Object.freeze(aString => stringFormatter(aString));

        // If this object consumes 1 or more CliofoTypes, has max range greater
        // than 0, and has a set string predicate.
        this.consumesStrings =    this.cliofoTypesToConsume.size !== 0
                               && this.range.max > 0
                               && this.#stringPredicate !== alwaysFalseReturningFunc;
    }

    /**
     * Returns the result of passing the provided `string` argument to this
     * object's `string` formatter then passing the formatted `string` to this
     * objects `string` predicate property.
     *
     * @remarks If no `string` validator is set, then all passed `string`
     *          arguments evaluate to `false`.
     *
     * @param aString The `string` to pass to this object's `string` validator.
     *
     * @returns The result of passing the provided `string` argument to this
     *          object's `string` validator.
     *
     * @public
     */
    public stringIsValid(aString: string): boolean
        { return this.#stringPredicate(this.#stringFormatter(aString)); }

    /**
     * Returns the result of passing the passed `string` argument to this
     * object's {@link #stringFormatter} function property.
     *
     * @param aString The `string` to pass to this object's
     *     {@link #stringFormatter} function property.
     *
     * @returns The result of passing the passed `string` argument to this
     *     object's {@link #stringFormatter} function property.
     */
    public formatString(aString: string): string
        { return this.#stringFormatter(aString); }

    /**
     * Getter for this object's {@link #stringPredicate} property that
     * contains the function that can be used to validate consumed operand,
     * flag, and/or option `string` arguments.
     *
     * @returns This object's {@link #stringPredicate} property.
     *
     * @public
     */
    public stringPredicate(): (aString: string) => boolean
        { return this.#stringPredicate; }

    /**
     * Getter for this object's {@link #stringFormatter} property that
     * contains the function that can be used to format consumed operand,
     * flag, and/or option `string` arguments.
     *
     * @returns This object's {@link #stringFormat} property.
     *
     * @public
     */
    public stringFormatter(): (aString: string) => string
        { return this.#stringFormatter; }

    /**
     * Returns `true` if this object's `string` predicate property is not set to
     * the default `string` predicate.
     *
     * @returns `true` if this object's `string` predicate property is not set
     *           to the default `string` predicate.
     *
     * @public
     */
    public hasStringPredicate(): boolean
        { return this.#stringPredicate !== alwaysFalseReturningFunc; }

    /**
     * Returns `true` if this object's `string` formatter property is not set to
     * the default `string` formatter.
     *
     * @returns `true` if this object's `string` formatter property is not set
     *           to the default `string` formatter.
     *
     * @public
     */
    public hasStringFormatter(): boolean
        { return this.#stringFormatter !== stringIdentityFunction; }

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
     * Returns the static default `string` formatter function which consists of
     * a function that consumes a `string` and returns the passed `string`
     * argument.
     *
     * @returns The static default `string` formatter function.
     *
     * @public
     * @static
     */
    public static stringIdentityFunction(): (aString:string) => string
        { return stringIdentityFunction; }
}

/**
 * Constructs an instance of an object used to represent a `string` that can
 * consume 0 or more operand, flag, and/or option `string` arguments
 * and can optionally contain a `string` predicate used to validate a `string`.
 *
 * The `string` predicate defaults to a method that always returns `false`.
 *
 * Setting the minimum and maximum range values equal to each other will
 * construct an object that requires exactly that amount of `string`
 * arguments to consume.
 *
 * If no minimum and maximum range values are specified, then the
 * constructed object won't consume any `string` arguments (its max and min
 * ranges are both set to `0`).
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
 * @param range A `number` minimum and maximum range of `string` arguments this
 *     object is required to and/or can consume.
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
export function untypedStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    range?: Partial<ConsumerRange>,
    cliofoTypesToConsume?: ReadonlySet<CliofoType>,
    stringPredicate?: (aString: string) => boolean,
    stringFormatter?: (aString: string) => string
) : UntypedStringConsumer;

/**
 * Constructs an instance of an object used to represent a `string` that is
 * required to consume 0 or more operand, flag, and/or option `string` arguments
 * and can optionally contain a `string` predicate used to validate a `string`.
 *
 * The `string` predicate defaults to a method that always returns `false`.
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
 * @param prefixString The leading prefix `string` used to denote the
 *                     constructed consumer as an operand, flag, or option.
 *
 * @param nonPrefixedString The `string` value of the constructed consumer
 *                          excluding any prefix characters.
 *
 * @param cliofoType The operand, option, or flag type of the constructed
 *                   consumer.
 *
 * @param numberOfStringsToConsume The `number` to set this object's minimum and
 *     maximum range values to.
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
export function untypedStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    numberOfStringsToConsume?: Partial<ConsumerRange>,
    cliofoTypesToConsume?: ReadonlySet<CliofoType>,
    stringPredicate?: (aString: string) => boolean,
    stringFormatter?: (aString: string) => string
) : UntypedStringConsumer;

export function untypedStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<ConsumerRange> | number = consumerRangeSetToZero,
    cliofoTypesToConsume: ReadonlySet<CliofoType> = emptyCliofoTypeSet,
    stringPredicate: (aString: string) => boolean = alwaysFalseReturningFunc,
    stringFormatter: (aString: string) => string = stringIdentityFunction
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( prefixString,
                                      nonPrefixedString,
                                      cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate,
                                      stringFormatter );
}

export function stringArgumentToStringConsumer(
    stringArgument: Readonly<StringArgument>,
    rangeOrNumber: Partial<ConsumerRange> | number = consumerRangeSetToZero,
    cliofoTypesToConsume: ReadonlySet<CliofoType> = emptyCliofoTypeSet,
    stringPredicate: (aString: string) => boolean = alwaysFalseReturningFunc,
    stringFormatter: (aString: string) => string = stringIdentityFunction
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( stringArgument.prefixString,
                                      stringArgument.nonPrefixedString,
                                      stringArgument.cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate,
                                      stringFormatter );
}

export {UntypedStringConsumer as default};

export {CliofoType} from "../../cliofo-type.js";
