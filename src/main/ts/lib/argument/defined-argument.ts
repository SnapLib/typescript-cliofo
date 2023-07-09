import { ConstrainedArgumentString } from "./constrained-argument-string.js";

export interface DefinedArgument extends ConstrainedArgumentString
{
    get description(): string;
    get name(): string;
}

export { DefinedArgument as default};
