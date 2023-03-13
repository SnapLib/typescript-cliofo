import {type StringsCountsIndexes} from "../../../lib/strings-counts-indexes.js";
import {type OperandFlagOption} from "../../operand-flag-option.js";
import {Parser} from "../../parser.js";

type Consumed = OperandFlagOption<StringsCountsIndexes>;

export class ConsumerParser
{
    public readonly consumed?: Readonly<Consumed>;

    public readonly prefixString: string;

    public readonly arguments: readonly string[];

    readonly #parser: Readonly<Parser>;

    public constructor(parser: Readonly<Parser>);
    public constructor(prefixString: string, strings: string[]);
    constructor(parserOrPrefixString: string | Readonly<Parser>, strings?: string[])
    {
        if (strings && typeof parserOrPrefixString === "string")
        {
            this.#parser = Object.freeze(new Parser(parserOrPrefixString, strings));
        }
        else if (parserOrPrefixString instanceof Parser)
        {
            this.#parser = Object.isFrozen(parserOrPrefixString)
                ? parserOrPrefixString
                : Object.freeze(new Parser(parserOrPrefixString));
        }
        else
        {
            throw new Error();
        }

        this.prefixString = this.#parser.prefixString;
        this.arguments = this.#parser.arguments;

    }

    public asParser(): Readonly<Parser> { return this.#parser; }
}

export {ConsumerParser as default};
