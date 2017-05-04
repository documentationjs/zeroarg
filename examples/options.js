#!/usr/bin/env node

var zeroarg = require('../');

zeroarg(function () {
  /**
   * Add numbers together
   * @param {number} numbers
   * @param {Object} options
   * @param {string} options.a
   * @param {number} options.b
   * @param {wiffles|waffles} [options.c=wiffles]
   */
  return function(hello, { a, b, c }) {
    console.log(hello, a, b, c);
  }
});
