import {type CliofoType} from "./cliofo-type.js";

/**
 * A type referencing properties derived from the {@link CliofoType} enum mapped
 * to values of the type specified by the passed type parameter.
 *
 * @param T The type of value each operand, flag, and option property are mapped
 *          to.
 */
export type OperandFlagOption<T> =
    {readonly [OfoTypeString in keyof typeof CliofoType as Lowercase<OfoTypeString>]: T};

export {type OperandFlagOption as default};
