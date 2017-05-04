const documentation = require("documentation");
const remark = require("remark");
const ansimd = require("ansimd");
const log = require("util").debuglog("zeroarg");

let md2cli = md => ansimd(remark().stringify(md));

function eatOptions(param) {
  var options = {};
  param.properties.forEach(property => {
    options[property.name.replace(/.*\./g, "")] = Object.assign(
      {},
      property.description
        ? {
            describe: md2cli(property.description).trim()
          }
        : {
            describe: "..."
          },
      paramToType(property)
    );
  });
  return options;
}

function typeToType(type) {
  switch (type.type) {
    case "NameExpression":
      switch (type.name.toLowerCase()) {
        case "string":
          return "string";
        case "number":
          return "number";
        case "boolean":
          return "boolean";
      }
    case "TypeApplication":
      if (type.expression && type.expression.name == "Array") {
        return "array";
      }
  }
  return "string";
}

function paramToType(property) {
  var { type } = property;
  var demandOption;
  var choices;
  var yargsType = {
    type: "string"
  };
  var def;

  if (property.default) {
    try {
      def = { default: eval(property.default) };
    } catch (err) {
      def = { default: property.default };
    }
  }

  if (property.type) {
    switch (type.type) {
      case "NonNullableType":
        type = type.expression;
        demandOption = { demandOption: true };
        break;

      case "OptionalType":
        type = type.expression;
        break;
    }

    if (type.type == "UnionType") {
      choices = {
        choices: type.elements.map(element => {
          return element.name;
        })
      };
    }

    yargsType = {
      type: typeToType(type)
    };
  }

  return Object.assign(yargsType, def, demandOption, choices);
}

function zeroarg(fn) {
  return documentation
    .build(
      {
        // Prefix with var to permit anonymous traditional functions
        source: "var _ = " + fn.toString()
      },
      {
        shallow: true
      }
    )
    .then(([doc]) => {
      var positionalArguments = [];
      var positionalArgumentNames = [];
      var options = {};
      var positional = true;
      var hasVariadic = false;
      doc.params.forEach((param, i) => {
        if (param.properties) {
          if (i !== doc.params.length - 1) {
            throw new Error("Options must be specified last");
          }
          Object.assign(options, eatOptions(param));
        } else {
          if (hasVariadic) {
            throw new Error(
              "A variadic positional argument must be the last positional argument"
            );
          }
          if (
            param.type &&
            param.type.type === "TypeApplication" &&
            param.type.expression.name === "Array"
          ) {
            positionalArguments.push("[" + param.name + "..]");
            hasVariadic = true;
          } else if (param.type && param.type.type === "NonNullableType") {
            positionalArguments.push("<" + param.name + ">");
          } else {
            positionalArguments.push("[" + param.name + "]");
          }
          positionalArgumentNames.push(param.name);
        }
      });

      return {
        options: options,
        epilogue: md2cli(doc.description),
        // one weird trick, since 'run ' means that this requires an argument.
        command: ["run", positionalArguments.join(" ")]
          .filter(Boolean)
          .join(" "),
        positionalArgumentNames: positionalArgumentNames
      };
    });
}

module.exports = zeroarg;
