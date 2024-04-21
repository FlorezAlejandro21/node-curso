import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-role.js";

import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} from "../controllers/productos.controller.js";

import {
  existCategoriaById,
  existProductoById,
} from "../helpers/db-validators.js";

export const routerProducto = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
routerProducto.get("/", obtenerProductos);

// Obtener una categoria por id - publico
routerProducto.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existProductoById),
    validarCampos,
  ],
  obtenerProducto
);

// Crear categoria - privado - cualquier persona con un token válido
routerProducto.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existCategoriaById),
    validarCampos,
  ],
  crearProducto
);

// Actualizar - privado - cualquiera con token válido
routerProducto.put(
  "/:id",
  [
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check("id").custom(existProductoById),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar una categoria - Admin
routerProducto.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existProductoById),
    validarCampos,
  ],
  borrarProducto
);
