import {StringConsumer} from "./argument/consumer/string-consumer.js";
import {Parser} from "./parser.js";

/**
 * An object that consume a {@link Parser} object and coverts it to a set of
 * parsed {@link StringConsumer} objects.
 */
export class StringConsumerParser
{
    public readonly parser: Readonly<Parser>;

    public constructor(parser: Readonly<Parser>)
    {
        this.parser = Object.isFrozen(parser) ? parser : Object.freeze(parser);
    }
}

export {StringConsumerParser as default};
