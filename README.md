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

Running the following command will install this package as a dependency of a
Node npm package:

```shell
npm i cliofo
```

## Tests

The source code containing the unit tests for this package can be found in the
[`./src/test/ts`](./src/test/ts "unit test source code") directory. It mimics
the directory structure of the deployable source code found in the
[`./src/main/ts`][deployable src code]

Running the command:

```text
npm test
```

will run the unit tests and output results to `stdout`.

Running the command:

```shell
npm run test-report
```

will output the test results into a webpage and open up the webpage via a
web browser. That generated webpage can be found at
`./build/test-report/index.html`.

This package uses the [Mocha][mocha website] testing framework and the
[Chai](https://www.chaijs.com/ "Chai assertion library") assertion library for
unit testing and [mochawesome](https://www.npmjs.com/package/mochawesome "mochawesome npm package") to generate the web based test report.

## Linting

Linting is done for all source code found in the
[`./src`](./src "source code directory"). This includes both the deployable
source code as well as the unit test source code. When a lint check is run it
outputs errors and warnings to `stdout`.

Run the default linter via:

```bash
npm run lint
```

This runs a less strict lint check where all warnings are silenced.

A stricter lint can be done via:

```bash
npm run lint-strict
```

This is identical to the other lint command, except it doesn't silence warnings.

This package uses [ESLint][eslint website] for linting.

## TypeDoc API Documentation

Running the command:

```bash
npm run tsdoc
```

will generate the documentation and output it via a webpage that can found at
`./build/tsdoc/index.html`. [TypeDoc](https://typedoc.org/guides/overview/ "TypeDoc") is used to generate the API documentation.

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
[mocha shield]: https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white "Mocha testing framework"
[mocha website]: https://mochajs.org/ "Mocha testing framework"
[node shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white "node"
[node version]: https://img.shields.io/node/v/cliofo?color=%2366ff66&&logo=node.js&style=flat-square "node version"
[node website]: https://nodejs.org/en/about "node"
[npm package license]: https://img.shields.io/npm/l/cliofo?color=%2366ff66&style=flat-square "MIT license"
[npm shield]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white "npm"
[npm version shield]: https://img.shields.io/npm/v/cliofo?color=%2366ff66&logo=npm&style=flat-square "npm version"
[npm website]: https://www.npmjs.com/ "npm"
[typescript shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white "TypeScript"
[typescript website]: https://www.typescriptlang.org/ "TypeScript"
