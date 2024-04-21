import { request, response } from "express";

export const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Quiere validar el user sin el token",
    });
  }
  const { rol, nombre } = req.user;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `No es un ADMIN. No autorizado, ${nombre}`,
    });
  }
  next();
};
