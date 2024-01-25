import { request, response } from "express";
import jwt from "jsonwebtoken";
import { usuario as Usuario } from "../models/usuario.js";

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Usuario no autorizado",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe en DB",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario no autorizado - inactivo",
      });
    }
    req.user = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token invalido",
    });
  }
};
