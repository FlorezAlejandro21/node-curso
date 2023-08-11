const { crearArchivoMultiplicar } = require("./helpers/multiplicar");
const argv = require("./config/yargs");

console.clear();

const { base, listar, final } = argv;

// const [, , dato = "base=0"] = process.argv;
// const [, base = 0] = dato.split("=");

crearArchivoMultiplicar(base, listar, final)
  .then((nombre) => console.log(nombre, "creado..."))
  .catch((err) => console.log(err));
