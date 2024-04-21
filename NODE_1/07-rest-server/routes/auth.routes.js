import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";

export const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

routerAuth.post(
  "/google",
  [
    check("GOOGLE_TOKEN", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);