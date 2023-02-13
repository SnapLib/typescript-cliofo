/**
 * Root class of the Cliofo argument prefix parser classes contained within this
 * package. This package only contains the properties for a `string` prefix and
 * `string[]` of arguments. The classes that inherit from this class then
 * implement how the prefix `string` is used to parse the strings of the
 * `string[]` arguments.
 */
export class CliofoPrefixParser
{
    /**
     * The leading prefix `string` used to denote which arguments are flags and
     * options.
     * @readonly
     */
    public readonly prefixString: string;

    /**
     * The strings to parse using this object's {@link prefixString}.
     * @readonly
     */
    public readonly arguments: readonly string[];

    readonly #isEmpty: boolean;

    protected constructor(prefixString: string, args: readonly string[])
    {
        this.prefixString = prefixString;
        this.arguments = Object.isFrozen(args) ? args : Object.freeze([...args]);
        this.#isEmpty = this.arguments.length === 0;
    }

    /**
     * Returns `true` if this object contains 0 strings to parse.
     *
     * @returns `true` if this object contains 0 strings to parse.
     */
    public IsEmpty(): boolean {return this.#isEmpty;}
}

export {CliofoPrefixParser as default};
