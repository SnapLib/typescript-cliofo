# Cliofo (Command Line Interface Operand Flag Option)

 npm package to implement a command line interface argument parser built around
 the concept of a prefix `string` used to parse  ***operand***, ***flag***, and
 ***option*** `string`s.

## Prefix string

A ***prefix string*** is a `string` used to determine if another `string` is an
*operand*, *flag*, or *option*.

## Operand

An ***operand*** is any `string` that isn't prefixed by a *prefix string*.

In the following example, `./aDirectory` is an *operand* passed to the
javascript script `ls.js`:

```shell
$ node ls.js -lc --all ./aDirectory
> # lists all contents of aDirectory in a colorized long listed format.
```

## Flag

A ***flag*** is any `string` that is prefixed by only a single leading
*prefix string*.

In the following example, `"l"` and `"c"` are *flag*s passed to the
javascript script `ls.js`:

```shell
$ node ls.js -lc --all ./aDirectory
> # lists all contents of aDirectory in a colorized long listed format.
```

## Option

An ***option*** is any `string` that is prefixed by 2 or more leading adjacent
*prefix string*s.

In the following example, `all` is an *option* passed to the
javascript script `ls.js`:

```shell
$ node ls.js -lc --all ./aDirectory
> # lists all contents of aDirectory in a colorized long listed format.
```
