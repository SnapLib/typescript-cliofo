# Cliofo (Command Line Interface Operand Flag Option)

 npm package to implement a command line interface argument parser built around
 the concept of a prefix character, operands, flags, and options.

## Prefix character

A ***prefix character*** is simply any single character. This character is used
to denote *flag* and *option* command line interface arguments.

## Operand

An ***operand*** is any command line interface argument that isn't prefixed by
the prefix character.

## Flag

A ***flag*** is any command line interface argument that is prefixed by only a
single prefix character.

## Option

A ***option*** is any command line interface argument that is prefixed by 2 or
more prefix characters.
