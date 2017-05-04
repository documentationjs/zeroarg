#!/usr/bin/env node

var zeroarg = require('../');

zeroarg(function () {
  /**
   * Add numbers together
   * @param {Array<number>} numbers
   */
  return function add(numbers) {
    console.log(numbers.reduce((sum, num) => sum + num, 0));
  }
});
