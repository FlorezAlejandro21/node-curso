import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";
import {
  actualizarImagen,
  cargarArchivo,
  mostrarImg,
} from "../controllers/uploads.controller.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validateFileImg } from "../middlewares/validate-img-file.js";

export const routerUpload = Router();

routerUpload.post("/", cargarArchivo);

routerUpload.put(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser un MongoID").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["users", "productos"])
    ),
    validateFileImg,
    validarCampos,
  ],
  actualizarImagen
);

routerUpload.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser un MongoID").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["users", "productos"])
    ),
    validarCampos,
  ],
  mostrarImg
);
