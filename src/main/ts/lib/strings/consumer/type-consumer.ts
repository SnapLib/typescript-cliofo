import {StringConsumer} from "./string-consumer";

export class TypeConsumer<T> extends StringConsumer
{
    readonly #stringConverter: (aString: string) => T;

    public constructor( stringValue: string,
                        range: Readonly<{min: number, max: number}>,
                        stringConverter: (aString: string) => T )
    {
        super(stringValue, range);
        this.#stringConverter = stringConverter;
    }
}

export {TypeConsumer as default};
