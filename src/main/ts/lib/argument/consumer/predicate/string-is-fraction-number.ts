/**
 * Returns `true` if the passed `string` argument contains a decimal point and
 * at least 1 integer. If a `string` contains a single period character and at
 * least 1 or more characters that when passed to `isNaN` returns `false`, then
 * it's considered a fraction number.
 *
 * @param aString The `string` to check if it's a fraction number.
 *
 * @returns `true` if the passed `string` argument is a fraction number.
 *
 * @function stringIsFractionNumber
 */
export const stringIsFractionNumber = Object.freeze(
    function(aString: string)
    {
        // string must have at least a decimal point and int
        if (aString.length < 2)
        {
            return false;
        }

        let decimalCharCount = 0;

        for (const char of aString)
        {
            // count decimal char, but if there's 2 return false
            if (char === "." && ++decimalCharCount === 2)
            {
                return false;
            }

            // check that all chars that aren't decimals are integers
            if (char !== "." && isNaN(Number(char)))
            {
                return false;
            }
        }

        // If there's no decimal point, return false
        return decimalCharCount === 1;
    }
);

export {stringIsFractionNumber as default};
