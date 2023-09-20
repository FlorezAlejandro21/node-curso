import { v4 as uuidV4 } from "uuid";

export class Tarea {
  constructor(descripcion) {
    this.id = uuidV4();
    this.descripcion = descripcion;
    this.completadoEn = null;
  }
}
