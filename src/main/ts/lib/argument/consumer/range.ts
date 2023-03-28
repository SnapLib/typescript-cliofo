import {ConsumerRangeError} from "./consumer-range-error.js";

/**
 * An object that contains a lower minimum and upper maximum bound that can be
 * used for a range.
 *
 * Trying to instantiate an object of this class with invalid minimum and
 * maximum `number` values will cause an error to be thrown.
 */
export class Range
{
    /**
     * A `number` used as the lower bound for this object's minimum range.
     *
     * @public
     * @readonly
     */
    public readonly min: number;

    /**
     * A `number` used as the upper bound for this object's maximum range.
     *
     * @public
     * @readonly
     */
    public readonly max: number;


    /**
     * Constructs an instance of an object that has a minimum lower and maximum
     * upper bound value that can be used for a range.
     *
     * The following 3 validations are performed and an error is thrown if any
     * of them are violated:
     *
     * - The minimum bound value is greater than or equal to `Infinity`.
     * - The maximum bound value is less than `0`.
     * - The minimum bound value is greater than the maximum bound value.
     *
     * @param min The lower bound to be used for this object's minimum range.
     *
     * @param max The upper bound to be used for this object's maximum range.
     *
     * @throws {ConsumerRangeError} If minimum and maximum range values aren't
     *                              valid. Such as a minimum range that's
     *                              greater than a maximum range.
     *
     * @public
     * @constructor
     */
    public constructor(min: number, max: number)
    {
        if (min  >= Infinity)
        {
            throw new ConsumerRangeError(`min range greater than or equal to Infinity: ${min} >= Infinity`);
        }

        if (max < 0)
        {
            throw new ConsumerRangeError(`max range less than 0: ${max} < 0`);
        }

        if (min > max)
        {
            throw new ConsumerRangeError(`min range greater than max range: ${min} > ${max}`);
        }

        this.min = min;
        this.max = max;
    }
}

export {Range as default};
