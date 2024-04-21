import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";
import {
  CategoriaDELETE,
  CategoriaGET,
  CategoriaGETByID,
  CategoriaPOST,
} from "../controllers/categorias.controller.js";
import { existCategoriaById } from "../helpers/db-validators.js";

export const routerCat = Router();

routerCat.get("/", CategoriaGET);
routerCat.get(
  "/:id",
  [check("id").custom(existCategoriaById), validarCampos],
  CategoriaGETByID
);

routerCat.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  CategoriaPOST
);

routerCat.delete(
  "/:id",
  [check("id").custom(existCategoriaById), validarCampos],
  CategoriaDELETE
);
