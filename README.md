# Cliofo (Command Line Interface Operand Flag Option)

\*\*\* ***THIS PROJECT IS CURRENTLY IN ALPHA STATUS AND DOES NOT HAVE ALL FEATURES
IMPLEMENTED AND WILL LIKELY GO THROUGH BREAKING CHANGES!*** \*\*\*

![npm (unscoped)][1] ![NPM][2] ![node-current (scoped)][3]

npm package to implement a command line interface argument parser in a
conventional GNU way. This API is built around the concept of a single leading
prefix character denoting ***flag*** arguments, 2 leading adjacent identical
characters denoting ***option*** arguments, and no leading prefix characters
denoting ***operand*** arguments.

## Installing

```bash
npm i cliofo
```

[1]: https://img.shields.io/npm/v/cliofo?color=%2366ff66&logo=npm&style=flat-square
[2]: https://img.shields.io/npm/l/cliofo?color=%2366ff66&style=flat-square
[3]: https://img.shields.io/node/v/cliofo?color=%2366ff66&&logo=node.js&style=flat-square
