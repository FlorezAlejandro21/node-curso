import { response } from "express";
import bcryptjs from "bcryptjs";
import { usuario as Usuario } from "../models/usuario.js";
import { generarJTW } from "../helpers/generate-jwt.js";

const login = async (req, res = response) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password incorrectos",
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    const token = await generarJTW(usuario.id);
    if (!usuario.estado) {
      res.status(400).json({
        msg: "Usuario / Password incorrectos, no esta activo",
      });
    } else if (!validPassword) {
      res.status(400).json({
        msg: "Usuario / Password incorrectos, password erroneo",
      });
    } else {
      res.json({
        usuario,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salio mal, hable con el admin",
    });
  }
};

export { login };
