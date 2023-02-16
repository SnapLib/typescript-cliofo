export interface ParsedCliofoArgument
{
    readonly strings: readonly string[]
    readonly counts: ReadonlyMap<string, number>
    readonly indexes: ReadonlyMap<string, readonly number[]>
}

export {ParsedCliofoArgument as default};
