/**
 * The 3 different types of command line interface arguments. These consist of
 * the:
 *
 * 1. ***OPERAND***
 *
 * Any argument that isn't prefixed with a leading string designating it a
 * ***FLAG*** or an ***OPTION***.
 *
 * 1. ***FLAG***
 *
 * If an argument is prefixed with only a single leading instance of a leading
 * string, it's interpreted as a ***FLAG***.
 *
 * 1. ***OPTION***
 *
 * If an argument is prefixed with a sequence of 2 or more instances of a
 * leading prefix string, then it's interpreted as an ***OPTION***.
 *
 * The leading prefix string can be any string. If the leading prefix string
 * is an empty string (`""`), then every argument is interpreted as an
 * ***OPERAND*** since there is no leading string.
 *
 * @enum
 */
export enum CliofoType
{
    OPERAND = "OPERAND",
    FLAG = "FLAG",
    OPTION = "OPTION"
}

export {CliofoType as default};
