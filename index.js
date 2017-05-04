const yargs = require("yargs");
const core = require("./core");
const log = require("util").debuglog("zeroarg");

/**
 * zeroarg a code-free argument parser
 *
 * Functions that you provide to zeroarg follow certain rules:
 *
 * Their arguments work like:
 *
 *     [positionalArgument],
 *     [positionalArgument2],
 *     [variadicPositionalArgument],
 *     [optionsArgument]
 *
 * - The first arguments can be positional arguments.
 * - The last argument to the method can be an object that receives the
 *   flag arguments (like --option). Only the last argument can be an options
 *   object.
 *   - Options can have JSDoc types of string, number, array, and boolean.
 *   - If you specify a default in JSDoc-land, it becomes a default in yargs
 *   - If you specify an argument as an enum in JSDoc-land, it becomes choices in yargs
 *
 * @param {Function} fn a function that returns a function, and has at least
 * one JSDoc comment preceding that function.
 * @example
 * zeroarg(() =>
 *  /**
 *   * Hello world
 *   *\/
 *  function helloworld() {
 *    console.log('Hello world');
 *  }
 * );
 */
function zeroarg(fn) {
  return core(fn)
    .then(yargsConfig => {
      yargs.reset();
      yargs.help();
      yargs.epilogue(yargsConfig.epilogue);
      yargs.options(yargsConfig.options);
      log(yargsConfig);

      var argv = yargs.command(yargsConfig.command).argv;
      var args = yargsConfig.positionalArgumentNames
        .map(name => {
          return argv[name];
        })
        .concat(argv);
      log(args);
      fn().apply(undefined, args);
    })
    .catch(err => {
      console.log(err.stack);
      throw err;
    });
}

module.exports = zeroarg;
