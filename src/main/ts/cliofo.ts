import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

console.log(path.resolve("./blep"));
