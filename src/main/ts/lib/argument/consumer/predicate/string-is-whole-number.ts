/**
 * Returns `true` if the passed `string` argument consists of at least 1 integer.
 * If every character when passed to `isNaN` returns `false`, then a `string` is
 * considered a whole number.
 *
 * @param aString The `string` to check if it's a whole number.
 *
 * @returns `true` if the passed `string` argument consists of 1 or more integers.
 *
 * @function stringIsWholeNumber
 */
export const stringIsWholeNumber =
    Object.freeze(function(aString: string) {return aString.length !== 0 && [...aString].every(char => ! Number.isNaN(char)); });

    export {stringIsWholeNumber as default};
