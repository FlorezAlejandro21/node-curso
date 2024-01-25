import { response } from "express";
import bcryptjs from "bcryptjs";
import { usuario as Usuario } from "../models/usuario.js";

const usuariosGET = async (req, res = response) => {
  const isUserActive = {
    estado: true,
  };
  const { limite = 5, desde = 0 } = req.query;
  // const usuarios = await Usuario.find(isUserActive)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const count = await Usuario.countDocuments(isUserActive);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(isUserActive),
    Usuario.find(isUserActive).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuariosPOST = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.json({
    data: usuario,
  });
};

const usuariosPUT = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...user } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, user);

  res.json({
    msg: "Response PUT of /api from controller",
    id,
  });
};

const usuariosDELETE = async (req, res = response) => {
  const { id } = req.params;
  const userAuth = req.user;
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    usuario,
    userAuth,
  });
};
export { usuariosGET, usuariosPOST, usuariosPUT, usuariosDELETE };
