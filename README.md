# Cliofo (Command Line Interface Operand Flag Option)

 npm package to implement a command line interface argument parser built around
 the concept of a prefix `string` used to parse  ***operand***, ***flag***, and
 ***option*** `string`s.

## Example

Heres is an example of how this package can be imported and used in TypeScript
and JavaScript:

<details>
  <summary>typescript</summary>

```typescript
import {Cliofo, parseStrings} from "Cliofo";

/*
* The parseStrings function gets passed a prefix string and then string
* arguments to parse into operands, flags, and options based on the provided
* prefix string. For the sake of this example, an array of strings is passed
* in place of where command line arguments could be passed;
*/
const cliofo: Cliofo = parseStrings("-", ["-foo", "--bar", "--baz", "-ao", "./a/path"]

console.log(cliofo.toJsonObj());

// The above statement would print the following object:
{
    operand: {
        strings: [ './a/path' ],
        counts: Map(1) { './a/path' => 1 },
        indexes: Map(1) { './a/path' => [ 4 ] }
    },
    flag: {
        strings: [ 'f', 'o', 'o', 'a', 'o' ],
        counts: Map(3) {
            'f' => 1,
            'o' => 3,
            'a' => 1
        },
        indexes: Map(3) {
            'f' => [ 0 ],
            '0' => [ 0, 3 ],
            'a' => [ 3 ]
        }
    },
    option: {
        strings: [ 'bar', 'baz' ],
        counts: Map(2) { 'bar' => 1, 'baz' => 1 },
        indexes: Map(2) { 'bar' => [ 1 ], 'baz' => [ 2 ] }
    }
}

```

</details>

<details>
  <summary>javascript</summary>

```javascript
import parseStrings from "Cliofo";

/*
* The parseStrings function gets passed a prefix string and then string
* arguments to parse into operands, flags, and options based on the provided
* prefix string. For the sake of this example, an array of strings is passed
* in place of where command line arguments could be passed;
*/
const cliofo = parseStrings("-", ["-foo", "--bar", "--baz", "-ao", "./a/path"]

console.log(cliofo.toJsonObj());

// The above statement would print the following object:
{
    operand: {
        strings: [ './a/path' ],
        counts: Map(1) { './a/path' => 1 },
        indexes: Map(1) { './a/path' => [ 4 ] }
    },
    flag: {
        strings: [ 'f', 'o', 'o', 'a', 'o' ],
        counts: Map(3) {
            'f' => 1,
            'o' => 3,
            'a' => 1
        },
        indexes: Map(3) {
            'f' => [ 0 ],
            '0' => [ 0, 3 ],
            'a' => [ 3 ]
        }
    },
    option: {
        strings: [ 'bar', 'baz' ],
        counts: Map(2) { 'bar' => 1, 'baz' => 1 },
        indexes: Map(2) { 'bar' => [ 1 ], 'baz' => [ 2 ] }
    }
}

```

</details>

## Prefix string

A ***prefix string*** is a `string` used to determine if another `string` is an
*operand*, *flag*, or *option*.

## Operand

An ***operand*** is any `string` that isn't prefixed by a *prefix string*.

In the following example, `./aDirectory` is an *operand* passed to the
javascript script `ls.js`:

```shell
$node ls.js -lc --all ./aDirectory
```

## Flag

A ***flag*** is <u>***a character***</u> that makes up any `string` that is
prefixed by only a single leading *prefix string*. The leading prefix `string`
character(s) are not considered flag character strings.

In the following example, `"l"`,  `"c"`, and `"x"` are *flag*s passed to the
javascript script `ls.js`:

```shell
$node ls.js -lc --all -x ./aDirectory
```

## Option

An ***option*** is any `string` that is prefixed by 2 or more leading adjacent
*prefix string*s. The leading 2 prefix `string`s are not considered part of the
passed option `string`.

In the following example, `all` is an *option* passed to the
javascript script `ls.js`:

```shell
$node ls.js -lc --all ./aDirectory
```
