import { request, response } from "express";
import { categoria as Categoria } from "../models/categoria.js";

export const CategoriaGET = async (req, res = response) => {
  const isCategoriaActive = {
    estado: true,
  };
  const { limite = 5, desde = 0 } = req.query;

  let [total, categorias] = await Promise.all([
    Categoria.countDocuments(isCategoriaActive),
    Categoria.find(isCategoriaActive).skip(Number(desde)).limit(Number(limite)),
  ]);
  categorias = await Categoria.find().populate("usuario");

  res.json({
    total,
    categorias,
  });
};

export const CategoriaGETByID = async (req, res = response) => {
  const { id } = req.query;
  let categorias = await Categoria.findById(id);
  categorias = await Categoria.find().populate("usuario");

  res.json({
    categorias,
  });
};

export const CategoriaPOST = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: "Categoria ya existe en la DB",
      nombre,
    });
  }
  const data = {
    nombre,
    usuario: req.user._id,
  };
  const categoria = new Categoria(data);
  await categoria.save();

  res.json(categoria);
};

export const CategoriaDELETE = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
  res.json({
    categoria,
  });
};
