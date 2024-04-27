import { request, response } from "express";

export const validateFileImg = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No se subió ningún archivo" });
    return;
  }
  next();
};
