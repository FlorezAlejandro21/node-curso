import { Router } from "express";
import {
  usuariosDELETE,
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
} from "../controllers/users.controller.js";

export const router = Router();

router.get("/", usuariosGET);
router.put("/:id", usuariosPUT);
router.post("/", usuariosPOST);
router.delete("/", usuariosDELETE);
