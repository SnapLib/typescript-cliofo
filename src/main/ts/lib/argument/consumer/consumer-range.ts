import {ConsumerRangeError} from "./consumer-range-error.js";

/**
 * An object that contains a lower minimum and upper maximum bound that can be
 * used for a range.
 *
 * This class can interpret `undefined` minimum and maximum range values and can
 * return both `undefined` and/or non-`undefined` safe minimum and maximum
 * values.
 */
export class ConsumerRange
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
     * Constructs an object instance that can has a minimum lower and/or maximum
     * upper bound value to use for a range.
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

export {ConsumerRange as default};
