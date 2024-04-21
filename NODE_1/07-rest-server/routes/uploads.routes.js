import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validate-fields.js";
import { cargarArchivo } from "../controllers/uploads.controller.js";

export const routerUpload = Router();

routerUpload.post("/", cargarArchivo);
