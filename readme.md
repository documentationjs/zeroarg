# zeroarg

<p align="center">
  <img src="./.github/logo.jpg" width="500" />
</p>

<p align="center">
  disappearing argument parser
</p>

This is admittedly a little :microscope: mad science. The gist is that zeroarg
is an argument parser, with [yargs](https://github.com/yargs/yargs) at its
core, that doesn't require you to touch yargs, or argument-parsing specifics.
It aims to infer types and reuse documentation to do that.

Here's an example CLI written with zeroarg:

```js
var zeroarg = require('zeroarg');

zeroarg(() =>
  /**
   * Add numbers together
   * @param {Array<number>} numbers
   */
  function add(numbers) {
    console.log(numbers.reduce((sum, num) => sum + num, 0));
  }
);
```

This produces proper help material:

```js
Commands:
  run [numbers..]

Options:
  --help  Show help     [boolean]

Add numbers together
```

And adds numbers together when you run it:

```js
$ ./examples/add.js run 1 2 3 4
10
```

## Why?

-   Argument parsing still feels like a source of uncertainty in programming: it's like
    the same as parsing query arguments, except for the CLI: you're getting who knows what
    from who knows who. Your program has types and expectations - maybe even official types
    with Flowtype - and yet argument parsers make you redeclare those types, or even
    allow untyped, unexpected input. What if argument parsers leveraged your program's
    existing assumptions and treated CLIs more like functions?
-   It's possibly a little less code to write, and one less API to learn! zeroarg's
    API surface is one function, and it uses existing standards (JSDoc & Flow)
    to express assumptions about argument types.
-   It's super fun and weird.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## zeroarg

zeroarg a code-free argument parser

Functions that you provide to zeroarg follow certain rules:

Their arguments work like:

    [positionalArgument],
    [positionalArgument2],
    [variadicPositionalArgument],
    [optionsArgument]

-   The first arguments can be positional arguments.
-   The last argument to the method can be an object that receives the
    flag arguments (like --option). Only the last argument can be an options
    object.
    -   Options can have JSDoc types of string, number, array, and boolean.
    -   If you specify a default in JSDoc-land, it becomes a default in yargs
    -   If you specify an argument as an enum in JSDoc-land, it becomes choices in yargs

**Parameters**

-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function that returns a function, and has at least
    one JSDoc comment preceding that function.

**Examples**

```javascript
zeroarg(() =>
 /**
  * Hello world
  *\/
 function helloworld() {
   console.log('Hello world');
 }
);
```
