import { ConstrainedArgumentString } from "./argument/constrained-argument-string.js";
import { OperandString } from "./argument/operand-string.js";
import { FlagString } from "./argument/flag-string.js";
import { OptionString } from "./argument/option-string.js";

const EMPTY_CONSTRAINED_ARGS_ARRAY: readonly ConstrainedArgumentString[] = Object.freeze([]);

export class ArgCollection
{
    readonly #arguments: readonly ConstrainedArgumentString[];
    readonly #operands: readonly OperandString[];
    readonly #flags: readonly FlagString[];
    readonly #options: readonly OperandString[];

    public constructor(constrainedArguments: readonly ConstrainedArgumentString[])
    {
        if (constrainedArguments.length === 0)
        {
            this.#arguments = EMPTY_CONSTRAINED_ARGS_ARRAY;
        }
        else
        {
            this.#arguments = Object.freeze(constrainedArguments
                .reduce((argArray: ConstrainedArgumentString[], argument) =>
                    {
                        if ( ! argArray.some(arg => argument.equals(arg)))
                        {
                            argArray.push(argument);
                        }

                        return argArray;
                    },
                []));
        }

        const ofo: readonly [OperandString[], FlagString[], OptionString[]] =
            this.#arguments.reduce(
                (argStrings, argString) =>
                {
                    if (argString instanceof OperandString)
                    {
                        argStrings[0].push(argString);
                    }
                    else if (argString instanceof FlagString)
                    {
                        argStrings[1].push(argString);
                    }
                    else if (argString instanceof OptionString)
                    {
                        argStrings[2].push(argString);
                    }

                    return argStrings;
                },
                Object.freeze([ [], [], [] ]) as readonly [OperandString[], FlagString[], OptionString[]]
            );

        this.#operands = Object.freeze(ofo[0]);
        this.#flags = Object.freeze(ofo[1]);
        this.#options = Object.freeze(ofo[2]);
    }
}
