import colors from "colors";
import { Tarea } from "./tarea.js";

class Tareas {
  _listado = {};

  get listarArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromList(tareas) {
    tareas.forEach((info) => {
      this._listado[info.id] = info;
    });
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listadoCompleto() {
    console.log();
    this.listarArr.forEach((tarea, i) => {
      const idx = colors.green(i + 1);
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${idx}. ${descripcion} :: ${estado}`);
    });
  }

  listarPedientesCompletadas(completada) {
    console.log();
    let contador = 0;
    this.listarArr.forEach((tarea) => {
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      if (completada) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${contador.toString().green}. ${descripcion} :: ${completadoEn}`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(
            `${contador.toString().green}. ${descripcion} :: ${estado}`
          );
        }
      }
    });
  }

  togglesComplete(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listarArr.forEach(tarea=>{
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

export { Tareas };
