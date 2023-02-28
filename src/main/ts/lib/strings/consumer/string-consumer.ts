/**
 * A string that can consume or is required to consume a range of 0 or more
 * `string` arguments.
 *
 * @remarks There's no checks or validations performed on the min and max
 *          values to make sure they're compatible and they're both explicitly
 *          required to be set. The {@link createStringConsumer} function
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

    public constructor(stringValue: string, range: Readonly<{min: number, max: number}>)
    {
        this.stringValue = stringValue;
        this.range = Object.isFrozen(range) ? range : Object.freeze({min: range.min, max: range.max});
    }
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

export function createStringConsumer(stringValue: string, min: number, max?: number): Readonly<StringConsumer>
{
    const maxRange: number = max ?? min;

    if (min > maxRange)
    {
        throw new Error(`min range greater than max range: ${min} > ${maxRange}`);
    }

    if (maxRange < 0)
    {
        throw new Error(`max range less than 0: ${maxRange} < 0`);
    }

    return Object.freeze(new StringConsumer(stringValue, Object.freeze({min: min, max: maxRange})));

}

export {createStringConsumer as default};