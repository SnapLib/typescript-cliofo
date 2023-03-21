import {TypeConsumer} from "./argument/type-consumer.js";
import {CliofoType} from "./cliofo-type.js";
import {Parser} from "./parser.js";

/**
 * An object that consume a {@link Parser} object and coverts it to a set of
 * parsed {@link TypeConsumer} objects unique to each of their argument indexes..
 */
export class TypeConsumerParser<ConvertedStringType>
{
    public readonly parser: Readonly<Parser>;

    public readonly parsedTypeConsumers: ReadonlySet<ParsedTypeConsumer<ConvertedStringType>>;

    public readonly operands: ReadonlySet<TypeConsumer<ConvertedStringType>>;

    public constructor(
        parser: Readonly<Parser>,
        stringPredicate: (aString: string) => boolean,
        stringConverter: (aString: string) => ConvertedStringType,
        convertedStringPredicate: (convertedString: ConvertedStringType) => boolean)
    {
        this.parser = Object.isFrozen(parser) ? parser : Object.freeze(new Parser(parser));

        this.parsedTypeConsumers = Parser.arguments.length === 0
            ? Object.freeze(new Set<ParsedTypeConsumer<ConvertedStringType>>())
            : new Set();

        this.operands = new Set([...this.parser.operand.indexes.entries()].map(operandIndexEntry => new TypeConsumer<ConvertedStringType>(
            this.parser.prefixString,
            operandIndexEntry[0],
            CliofoType.OPERAND,
            {min: 0, max: 0},
            new Set(),
            stringPredicate,
            stringConverter,
            convertedStringPredicate
        )));
    }
}
 type ParsedTypeConsumer<ConvertedStringType> = TypeConsumer<ConvertedStringType> & {readonly index: number};

export {TypeConsumerParser as default};
