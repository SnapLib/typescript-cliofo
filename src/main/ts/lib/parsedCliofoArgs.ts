export interface ParsedCliofoArgs
{
    readonly strings: readonly string[]
    readonly counts: ReadonlyMap<string, number>
}

export {ParsedCliofoArgs as default};
