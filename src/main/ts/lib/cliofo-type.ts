/**
 * The 3 different types of command line interface arguments. A specified
 * `string` is used to denote if other `string`s are*** OPERANDS***,
 * ***FLAGS***, or ***OPTIONS***:
 *
 * 1. ***OPERAND***
 *
 * Any argument that isn't prefixed with a leading string designating it a
 * ***FLAG*** or an ***OPTION***.
 *
 * 1. ***FLAG***
 *
 * Any argument that is prefixed with only a single leading instance of a
 * string designating it a ***FLAG*** an ***OPTION*** is interpreted as a
 * ***FLAG***.
 *
 * 1. ***OPTION***
 *
 * Any argument that is prefixed with a leading sequence of 2 or more instances
 * of a string designating it a ***FLAG*** or an ***OPTION*** is interpreted as
 * an ***OPTION***.
 *
 * The leading prefix string can be any string. If the leading prefix string
 * is an empty string (`""`), then every argument is interpreted as an
 * ***OPERAND*** since there is no leading string.
 *
 * @example
 * If a single hyphen character (`"-"`) is the leading prefix string used to
 * designate if an argument is a ***FLAG*** or ***OPTION***:
 *
 * ```shell
 * $node my-script.js --anOption -aFlag anOperand
 * ```
 *
 * In the above example, the 3 arguments "--anOption", "--aFlag", and
 * "anOperand" are being passed to the javascript script "my-script.js" being
 * executed by node.
 *
 * The 1st argument, "--anOption", is interpreted as an option since it's
 * prefixed with at least 2 instances of the leading prefix string which in this
 * case is a dash character (`"-"`).
 *
 * The 2nd argument, "--aFlag", is interpreted as a flag since it's
 * prefixed with only a single instance of the leading prefix string which in
 * this case is a dash character (`"-"`).
 *
 * The 3rd argument, "--anOperand", is interpreted as an operand since it's
 * prefixed with no instances of the leading prefix string which in
 * this case is a dash character (`"-"`).
 *
 * @enum {string}
 */
export enum CliofoType
{
    OPERAND = "OPERAND",
    FLAG = "FLAG",
    OPTION = "OPTION"
}

export {CliofoType as default};
