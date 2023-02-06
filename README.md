# Cliofo (Command Line Interface Operand Flag Option)

 npm package to implement a command line interface argument parser built around
 the concept of a prefix `string` used to parse  ***operand***, ***flag***, and
 ***option*** `string`s.

## Prefix string

A ***prefix string*** is a `string` used to determine if another `string` is an
*operand*, *flag*, or *option*.

## Operand

An ***operand*** is any `string` that isn't prefixed by a *prefix string*.

## Flag

A ***flag*** is any `string` that is prefixed by only a single leading
*prefix string*.

## Option

An ***option*** is any `string` that is prefixed by 2 or more leading adjacent
*prefix string*s.
