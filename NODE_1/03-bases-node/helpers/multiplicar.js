const fs = require("fs");
const color = require("colors");

const crearArchivoMultiplicar = async (base, listar, final) => {
  //return new Promise((resolve, reject) => {
  let salida = (consola = "");
  for (let index = 1; index <= final; index++) {
    salida += `${base} x ${index} = ${base * index}\n`;
    consola += `${base} ${color.green("x")} ${index} ${"=".green} ${
      base * index
    }\n`;
  }

  fs.writeFileSync(`./tablas/tabla-${base}.txt`, salida);
  if (listar) console.log(color.blue(consola));
  return `tabla-${base}.txt`;
  //});
};

module.exports = { crearArchivoMultiplicar };
