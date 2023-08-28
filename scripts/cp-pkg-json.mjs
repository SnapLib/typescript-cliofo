import { join as joinPath, resolve as resolvePath } from "node:path";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

class CopyPackageJsonError extends Error
{
    name = CopyPackageJsonError.name;

    constructor(message)
    {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

const cliArgs = Object.freeze(process.argv.slice(2));

if (cliArgs.length !== 2)
{
    throw new CopyPackageJsonError(`Expected 2 arguments (input file and output directory), but instead got ${cliArgs.length}: ${cliArgs}`);
}

const pkgJsonPath = resolvePath(cliArgs[0]);
const outDir = resolvePath(cliArgs[1]);

if ( ! existsSync(pkgJsonPath))
{
    throw new CopyPackageJsonError(`Input file to copy does not exist: "${pkgJsonPath}"`);
}

if ( ! statSync(pkgJsonPath).isFile())
{
    throw new CopyPackageJsonError(`Input file to copy is not a file: "${pkgJsonPath}"`);
}

if (existsSync(outDir) && ! statSync(outDir).isDirectory())
{
    throw new CopyPackageJsonError(`Output directory to copy to exists as non-directory: "${outDir}"`);
}

const pkgJsonObject = Object.freeze(JSON.parse(readFileSync(pkgJsonPath).toString()));

const pkgJsonPropsToExclude = Object.freeze(["private", "scripts", "devDependencies"]);

const distPkgJsonObj = Object.freeze(Object.fromEntries(Object.entries(pkgJsonObject).filter(pkgJsonEntry => ! pkgJsonPropsToExclude.includes(pkgJsonEntry[0]))));

const distPkgJsonString = JSON.stringify(distPkgJsonObj);

if ( ! existsSync(outDir))
{
    mkdirSync(outDir, {recursive: true});
}

const outPath = joinPath(outDir, "package.json");

if (existsSync(outPath) && ! statSync(outPath).isFile())
{
    throw new CopyPackageJsonError(`Copy output path points to pre-existing non-file: "${outPath}"`);
}

console.log(`Writing file "${outPath}"...`);

writeFileSync(outPath, distPkgJsonString);

if ( ! existsSync(outPath))
{
    throw new CopyPackageJsonError(`Error writing file. File doesn't exist after write operation: "${outPath}"`);
}

if ( ! statSync(outPath).isFile())
{
    throw new CopyPackageJsonError(`Error writing file. Output path exists as non-file after write operation: "${outPath}"`);
}

process.exit(0);
