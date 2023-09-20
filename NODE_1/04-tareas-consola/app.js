import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  confrimDelete,
  inquirerContinue,
  inquirerMenu,
  listDelete,
  readInput,
  showCheckList,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const leerTareas = leerDB();

  if (leerTareas) tareas.cargarTareasFromList(leerTareas);

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPedientesCompletadas(true);
        break;
      case "4":
        tareas.listarPedientesCompletadas(false);
        break;
      case "5":
        const ids = await showCheckList(tareas.listarArr);
        tareas.togglesComplete(ids);
        break;
      case "6":
        const id = await listDelete(tareas.listarArr);
        if (id !== "0") {
          const confirmar = await confrimDelete("¿Esta seguro?");
          if (confirmar) {
            tareas.borrarTarea(id);
          }
          break;
        }
    }

    guardarDB(tareas.listarArr);
    await inquirerContinue();
  } while (opt !== "0");
};
main();
