export interface ParsedCliofoArgument
{
    readonly strings: readonly string[]
    readonly counts: ReadonlyMap<string, number>
}

export {ParsedCliofoArgument as default};
