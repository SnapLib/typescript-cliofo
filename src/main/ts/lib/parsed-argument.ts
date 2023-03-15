import {TypeConsumer} from "./argument/consumer/type-consumer.js";

export class ParsedArgument
{
    readonly #typeConsumer: Readonly<TypeConsumer<unknown>>;
    readonly #argumentIndex: number;

    public constructor(typeConsumer: Readonly<TypeConsumer<unknown>>, argumentIndex: number)
    {
        this.#typeConsumer = Object.isFrozen(typeConsumer) ? typeConsumer
            : Object.freeze(new TypeConsumer<unknown>(
                typeConsumer.prefixString,
                typeConsumer.nonPrefixedString,
                typeConsumer.cliofoType,
                typeConsumer.cliofoTypesToConsume,
                typeConsumer.range,
                typeConsumer.stringPredicate
            ));

        this.#argumentIndex = argumentIndex;
    }
}

export {ParsedArgument as default};
