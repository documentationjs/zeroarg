#!/usr/bin/env node

var zeroarg = require("../");

zeroarg(
  () =>
    /**
   * Hello world, with a default.
   */
    function add({ name = "John" }) {
      console.log(`Hello, ${name}`);
    }
);
