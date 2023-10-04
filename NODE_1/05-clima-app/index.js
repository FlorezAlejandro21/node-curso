import {
  inquirerContinue,
  inquirerMenu,
  listarLugares,
  readInput,
} from "./helpers/inquirer.js";
import { Busqueda } from "./models/busqueda.js";
import dotenv from "dotenv";

dotenv.config({ path: "../05-clima-app/tokens.env" });

const main = async () => {
  let opt = 0;
  const busquedas = new Busqueda();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        //Mostrar mensaje
        const lugar = await readInput("¿Qué lugar desea buscar?");

        //Buscar lugar
        const resultados = await busquedas.ciudad(lugar);
        //Seleccionar lugar
        const seleccion = await listarLugares(resultados);
        if (seleccion === 0) continue;
        const { nombre, latitud, longitud } = resultados.find(
          (e) => e.id === seleccion
        );

        busquedas.agregarHistorial(nombre);
        //Clima data
        const { descripcion, min, max, temp } = await busquedas.climaLugar(
          latitud,
          longitud
        );
        //Mostrar resultados
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad:", nombre.green);
        console.log("Lng:", longitud);
        console.log("Lat:", latitud);
        console.log("Temperatura:", temp);
        console.log("Descripcion:", descripcion.green);
        console.log("Temperatura minima:", min);
        console.log("Temperatura maxima:", max);
        break;
      case 2:
        busquedas.lugarCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx}. ${lugar}`);
        });
        break;
    }
    if (opt !== 0) await inquirerContinue();
  } while (opt != 0);
};

main();
