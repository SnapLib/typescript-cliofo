export const joinStringsFormatted = (strings: readonly string[]): string =>
{
    const quotes: string = strings.length !== 0 ? "\"" : "";
    return `[${quotes}${strings.join("\", \"")}${quotes}]`;
};
