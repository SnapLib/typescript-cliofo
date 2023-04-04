/**
 * Returns `true` if the passed `string` argument is a number.
 *
 * @param aString The `string` to check if a number.
 *
 * @returns `true` if the passed `string` argument is a number.
 */
export const stringIsNumber = Object.freeze(
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
            if (char !== "." && Number.isNaN(char))
            {
                return false;
            }
        }

        return true;
    }
);

export {stringIsNumber as default};
