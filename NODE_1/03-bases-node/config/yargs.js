const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    demandOption: true,
    default: false,
  })
  .option("f", {
    alias: "final",
    type: "number",
    demandOption: true,
    default: 10,
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) throw "La base debe ser un numero";
    if (isNaN(argv.f)) throw "El limite debe ser un numero";
    return true;
  }).argv;

module.exports = argv;
