/**
 * Joins together an array of strings in a pretty way.
 *
 * @param strings The strings to join together.
 * @returns the provided strings joined together as a single string.
 */
export const joinStringsFormatted = (strings: readonly string[]): string =>
{
    const quotes: string = strings.length !== 0 ? "\"" : "";
    return `[${quotes}${strings.join("\", \"")}${quotes}]`;
};
