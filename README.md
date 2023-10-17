# Cliofo (Command Line Interface Operand Flag Option)

\*\*\* ***THIS PROJECT IS CURRENTLY IN ALPHA STATUS AND DOES NOT HAVE ALL FEATURES
IMPLEMENTED AND WILL LIKELY GO THROUGH BREAKING CHANGES!*** \*\*\*

![npm version shield][npm version shield]
![npm package license][npm package license]
![node version][node version]

npm package to implement a command line interface argument parser in a
conventional GNU way. This API is built around the concept of a single leading
prefix character denoting ***flag*** arguments, 2 leading adjacent identical
characters denoting ***option*** arguments, and no leading prefix characters
denoting ***operand*** arguments.

## Installing

```bash
npm i cliofo
```

## Tests

The source code containing the unit tests for this package can be found in the
[`./src/test/ts`](./src/test/ts "unit test source code") directory. It mimics
the directory structure of the deployable source code found in the
[`./src/main/ts`][deployable src code]

Running the `$npm test` script will run the unit tests and output results to
`stdout`. Running the `$npm run test-report` script will output the test
results into a webpage that can be found at `./build/test-report/index.html`.

---

[![github shield][github shield]][github repo]
[![TypeScript][typescript shield]][typescript website]
[![Mocha][mocha shield]][mocha website]
[![ESLint][eslint shield]][eslint website]
[![npm][npm shield]][npm website]
[![NodeJS][node shield]][node website]

[deployable src code]: ./src/main/ts "deployable source code"
[eslint shield]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white "eslint"
[eslint website]: https://eslint.org/ "eslint"
[github shield]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white "github"
[github repo]: https://github.com/SnapLib/typescript-cliofo "github"
[mocha shield]: https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white "Mocha"
[mocha website]: https://mochajs.org/ "Mocha"
[node shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white "node"
[node version]: https://img.shields.io/node/v/cliofo?color=%2366ff66&&logo=node.js&style=flat-square "node version"
[node website]: https://nodejs.org/en/about "node"
[npm package license]: https://img.shields.io/npm/l/cliofo?color=%2366ff66&style=flat-square "MIT license"
[npm shield]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white "npm"
[npm version shield]: https://img.shields.io/npm/v/cliofo?color=%2366ff66&logo=npm&style=flat-square "npm version"
[npm website]: https://www.npmjs.com/ "npm"
[typescript shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white "TypeScript"
[typescript website]: https://www.typescriptlang.org/ "TypeScript"
