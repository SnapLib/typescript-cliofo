/**
 * Returns `true` if the passed `string` argument has a length of `1`.
 *
 * @param aString The `string` to check if it's a character.
 *
 * @returns `true` if the passed `string` has a length of `1`.
 *
 * @function stringIsChar
 */
export const stringIsChar = Object.freeze(function(aString: string) {return aString.length === 1;});

export {stringIsChar as default};
