import { OperandsFlagsOptions } from "./operandsFlagsOptions.js";

export class OperandFlagOptionOccurrence
{
    readonly #operandsFlagsOptions: Readonly<OperandsFlagsOptions>;
    readonly #operandsFlagsOptionsCountMap: ReadonlyMap<string, number>;

    private constructor(operandsFlagsOptions: OperandsFlagsOptions)
    {
        this.#operandsFlagsOptions = Object.isFrozen(operandsFlagsOptions)
            ? operandsFlagsOptions : Object.freeze(operandsFlagsOptions);

        this.#operandsFlagsOptionsCountMap = new Map(
            []
        );
    }
}
