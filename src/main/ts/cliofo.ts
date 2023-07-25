import { optionString } from "./lib/argument/option-string.js";
import { ArgCollection } from "./lib/arg-collection.js";
import { flagString } from "./lib/argument/flag-string.js";

const argCollection = new ArgCollection([
    flagString("-", "a"),
    optionString("--", "directory")
]);

console.log(argCollection.parseIndexes(process.argv.slice(2)));
