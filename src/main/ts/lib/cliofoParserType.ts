import {type CliofoCounts} from "./cliofoCounts.js";
import {type CliofoIndexes} from "./cliofoIndexes.js";
import {type CliofoStrings} from "./cliofoStrings.js";

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
