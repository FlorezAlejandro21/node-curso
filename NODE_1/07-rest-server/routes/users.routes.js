import { Router } from "express";
import { check } from "express-validator";
import {
  usuariosDELETE,
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
} from "../controllers/users.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import {
  existEmail,
  existUserById,
  isValidRole,
} from "../helpers/db-validators.js";
import { validarJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-role.js";

export const router = Router();

router.get("/", usuariosGET);
router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPUT
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 5 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existEmail),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPOST
);
router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    validarCampos,
  ],
  usuariosDELETE
);
