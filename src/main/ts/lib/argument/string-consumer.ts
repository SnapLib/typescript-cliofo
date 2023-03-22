import {Consumer} from "./consumer.js";
import {type ConsumerRange} from "./consumer/consumer-range.js";
import {type CliofoType} from "./consumer/untyped-string-consumer.js";

export class StringConsumer extends Consumer<string>
{
    public constructor(
        prefixString: string,
        nonPrefixedString: string,
        cliofoType: CliofoType,
        rangeOrNumber: Partial<ConsumerRange> | number,
        cliofoTypesToConsume: ReadonlySet<CliofoType>,
        stringPredicate: (aString: string) => boolean,
        stringConverter: (aString: string) => string,
        convertedStringPredicate: (aString: string) => boolean )
    {
        super( prefixString,
               nonPrefixedString,
               cliofoType,
               rangeOrNumber,
               cliofoTypesToConsume,
               stringPredicate,
               stringConverter,
               convertedStringPredicate );
    }
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
export function createStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    range?: Partial<ConsumerRange>,
    cliofoTypesToConsume?: ReadonlySet<CliofoType>,
    stringPredicate?: (aString: string) => boolean,
    stringConverter?: (aString: string) => string,
    convertedStringPredicate?: (aString: string) => boolean
) : StringConsumer;

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
 * @param numberOfArgsToConsume The `number` to set this object's minimum and
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
export function createStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    numberOfArgsToConsume?: number,
    cliofoTypesToConsume?: ReadonlySet<CliofoType>,
    stringPredicate?: (aString: string) => boolean,
    stringConverter?: (aString: string) => string,
    convertedStringPredicate?: (aString: string) => boolean
) : StringConsumer;

export function createStringConsumer(
    prefixString: string,
    nonPrefixedString: string,
    cliofoType: CliofoType,
    rangeOrNumber: Partial<ConsumerRange> | number = Consumer.zeroRange(),
    cliofoTypesToConsume: ReadonlySet<CliofoType> = Consumer.emptyCliofoTypeSet(),
    stringPredicate: (aString: string) => boolean = Consumer.alwaysFalsePredicate(),
    stringConverter: (aString: string) => string = Consumer.stringIdentityFunction(),
    convertedStringPredicate: (aString: string) => boolean = Consumer.alwaysFalsePredicate()
) : StringConsumer
    {
        return new StringConsumer( prefixString,
                                   nonPrefixedString,
                                   cliofoType,
                                   rangeOrNumber,
                                   cliofoTypesToConsume,
                                   stringPredicate,
                                   stringConverter,
                                   convertedStringPredicate );
    }

export {StringConsumer as default};