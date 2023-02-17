import {type CliofoCounts} from "./cliofo-counts.js";
import {type CliofoIndexes} from "./cliofo-indexes.js";
import {type CliofoStrings} from "./cliofo-strings.js";

/**
 * The different types of Cliofo prefix parsers there are. These include types
 * such as:
 *
 * - `CliofoStrings`
 * - `CliofoCounts`
 * - `CliofoIndexes`
 */
export type CliofoParserType = CliofoStrings | CliofoCounts | CliofoIndexes;

export {type CliofoParserType as default};
