import {CliofoType} from "./cliofo-type.js";

export type OperandFlagOption<T> =
    {readonly [OfoTypeString in keyof typeof CliofoType as Lowercase<OfoTypeString>]: T};

export {OperandFlagOption as default};
