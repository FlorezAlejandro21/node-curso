import { response, request } from "express";
import { subirArchivo } from "../helpers/upload-files.js";
import { producto as Producto } from "../models/producto.js";
import { usuario as Usuario } from "../models/usuario.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const cargarArchivo = async (req = request, res = response) => {
  try {
    const ruta = await subirArchivo(req.files, undefined, "imgs");
    res.json({ ruta });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

export const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "users":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe producto con el id ${id}` });
      }
      break;

    default:
      res.json({ msg: "No estoy funcionando...", coleccion, id });
  }

  //Limpiar imgs
  if (modelo.img) {
    const pathImg = path.join(modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }
  const ruta = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = ruta;
  await modelo.save();
  res.json(modelo);
};

export const mostrarImg = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "users":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe producto con el id ${id}` });
      }
      break;

    default:
      res.json({ msg: "No estoy funcionando...", coleccion, id });
  }

  //Limpiar imgs
  if (modelo.img) {
    const pathImg = path.join(modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const imageNotFound = path.join(__dirname, "../assets", "no-image.jpg");
  res.sendFile(imageNotFound);
};
