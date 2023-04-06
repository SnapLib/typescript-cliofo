import {Range} from "./range.js";
import {type CliofoType} from "../../cliofo-type.js";
import {StringArgument} from "./string-argument.js";

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
 * A frozen instance of a {@link Range} object with it's maximum and
 * minimum values set to `0`.
 *
 * @constant
 */
const consumerRangeSetToZero: Readonly<Range> = Object.freeze(new Range(0, 0));

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
    public readonly range: Readonly<Range>;

    /**
     * A `string` predicate that can be used to validate `string` arguments.
     *
     * @readonly
     */
    readonly #stringPredicate: (aString: string) => boolean;

    readonly #frozenStringPredicate: (aString: string) => boolean;

    readonly #stringFormatter: (aString: string) => string;

    readonly #frozenStringFormatter: (aString: string) => string;

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
     * @param aStringValue The `string` value of the constructed consumer
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
    public constructor( aStringValue: string,
                        cliofoType: CliofoType,
                        rangeOrNumber: Partial<Range> | number,
                        cliofoTypesToConsume: ReadonlySet<CliofoType>,
                        stringPredicate: (aString: string) => boolean,
                        stringFormatter: (aString: string) => string )
    {
        super(aStringValue, cliofoType);

        this.cliofoTypesToConsume = Object.isFrozen(cliofoTypesToConsume)
            ? cliofoTypesToConsume
            : Object.freeze(new Set(cliofoTypesToConsume));

        if (typeof rangeOrNumber === "number")
        {
            this.range = Object.freeze(new Range(rangeOrNumber, rangeOrNumber));
        }
        else if (rangeOrNumber instanceof Range)
        {
            this.range = Object.isFrozen(rangeOrNumber) ? rangeOrNumber
                : Object.freeze(new Range(
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

        this.#stringPredicate = stringPredicate;

        this.#frozenStringPredicate = Object.isFrozen(this.#stringPredicate) ? this.#stringPredicate
        : Object.freeze(aString => this.#stringPredicate(aString));

        this.#stringFormatter = stringFormatter;

        this.#frozenStringFormatter = Object.isFrozen(this.#stringFormatter) ? this.#stringFormatter
            : Object.freeze(aString => this.#stringFormatter(aString));

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
     * Returns a frozen instance of this object's {@link #frozenStringPredicate}
     * property that contains the function that can be used to validate consumed
     * operand, flag, and/or option `string` arguments.
     *
     * @returns This object's {@link #frozenStringPredicate} property.
     */
    public stringPredicate(): (aString: string) => boolean
        { return this.#frozenStringPredicate; }

    /**
     * Returns a frozen instance of this object's {@link #frozenStringFormatter}
     * property that contains the function that can be used to format consumed
     * operand, flag, and/or option `string` arguments.
     *
     * @returns This object's {@link #frozenStringFormat} property.
     *
     */
    public stringFormatter(): (aString: string) => string
        { return this.#frozenStringFormatter; }

    /**
     * Returns `true` if this object's `string` predicate property is not set to
     * the default `string` predicate.
     *
     * @returns `true` if this object's `string` predicate property is not set
     *           to the default `string` predicate.
     *
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
     */
    public hasStringFormatter(): boolean
        { return this.#stringFormatter !== stringIdentityFunction; }

    /**
     * Returns `true` if the passed argument is an {@link UntypedStringConsumer}
     * object that is equal to this {@link UntypedStringConsumer} object.
     *
     * @param other Object or value to check for equality to this
     *              {@link UntypedStringConsumer} object.
     *
     * @returns `true` if the passed argument is an
     *           {@link UntypedStringConsumer} object that is equal to this
     *           {@link UntypedStringConsumer} object
     */
    public equals(other: unknown): boolean
        {
            if (other === undefined || other === null)
            {
                return false;
            }

            if ( ! (other instanceof UntypedStringConsumer) )
            {
                return false;
            }

            if (this === other)
            {
                return true;
            }

            return     this.range.min === other.range.min
                    && this.range.max === other.range.max
                    && this.#stringPredicate === other.#stringPredicate
                    && this.#stringFormatter === other.#stringFormatter
                    && this.cliofoTypesToConsume.size === other.cliofoTypesToConsume.size
                    && ( this.cliofoTypesToConsume.size === 0
                         ? true
                             :  [...this.cliofoTypesToConsume.values()]
                                 .every(cliofoType => other.cliofoTypesToConsume.has(cliofoType)) );
        }

    /**
     * Returns an empty `Set<`{@link CliofoType}`>` used as this class' default
     * {@link cliofoTypesToConsume} property value. This creates a
     * {@link UntypedStringConsumer} that doesn't consume any `string` arguments.
     *
     * @returns The static default `{min: number, max: number}` range object.
     *
     * @static
     */
    public static emptyCliofoTypeSet(): ReadonlySet<CliofoType>
        { return emptyCliofoTypeSet; }

    /**
     * Returns the {@link Range} object used as this class' default
     * {@link range} property value which consists of a range with both its
     * minimum and maximum values set to `0`. This creates a
     * {@link UntypedStringConsumer} that doesn't consume any `string` arguments.
     *
     * @returns The {@link Range} object used as this class' default
     *          {@link range} property.
     *
     * @static
     */
    public static zeroRange(): Readonly<Range>
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
 * @param stringValue The `string` value of the constructed object instance.
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
    stringValue: string,
    cliofoType: CliofoType,
    range?: Partial<Range>,
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
 * @param stringValue The `string` value of the constructed object instance.
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
    stringValue: string,
    cliofoType: CliofoType,
    numberOfStringsToConsume?: Partial<Range>,
    cliofoTypesToConsume?: ReadonlySet<CliofoType>,
    stringPredicate?: (aString: string) => boolean,
    stringFormatter?: (aString: string) => string
) : UntypedStringConsumer;

export function untypedStringConsumer(
    aStringValue: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<Range> | number = consumerRangeSetToZero,
    cliofoTypesToConsume: ReadonlySet<CliofoType> = emptyCliofoTypeSet,
    stringPredicate: (aString: string) => boolean = alwaysFalseReturningFunc,
    stringFormatter: (aString: string) => string = stringIdentityFunction
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( aStringValue,
                                      cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate,
                                      stringFormatter );
}

export function stringArgumentToStringConsumer(
    stringArgument: Readonly<StringArgument>,
    rangeOrNumber: Partial<Range> | number = consumerRangeSetToZero,
    cliofoTypesToConsume: ReadonlySet<CliofoType> = emptyCliofoTypeSet,
    stringPredicate: (aString: string) => boolean = alwaysFalseReturningFunc,
    stringFormatter: (aString: string) => string = stringIdentityFunction
) : UntypedStringConsumer
{
    return new UntypedStringConsumer( stringArgument.stringValue,
                                      stringArgument.cliofoType,
                                      rangeOrNumber,
                                      cliofoTypesToConsume,
                                      stringPredicate,
                                      stringFormatter );
}

export {UntypedStringConsumer as default};

export {CliofoType} from "../../cliofo-type.js";
