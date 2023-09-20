require("colors");

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log("========================".green);
    console.log(" Seleccione una opcion".green);
    console.log("========================\n".green);

    console.log(`${"1.".green} Crear una tarea\n${"2.".green} Listar tareas`);
    console.log(
      `${"3.".green} Listar tareas completadas\n${
        "4.".green
      } Listar tareas pendientes`
    );
    console.log(
      `${"5.".green} Completar tarea(s)\n${"6.".green} Borrar una tarea`
    );
    console.log(`${"0.".green} Salir\n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Seleccione una opcion: ", (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pausar = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${"ENTER".green} para continuar`, (opt) => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausar,
};
