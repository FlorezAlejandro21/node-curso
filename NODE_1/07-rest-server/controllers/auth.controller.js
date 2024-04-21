import { json, response } from "express";
import bcryptjs from "bcryptjs";
import { usuario as Usuario } from "../models/usuario.js";
import { generarJTW } from "../helpers/generate-jwt.js";
import { googleVerify } from "../middlewares/google-verify.js";

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

const googleSignIn = async (req, res = response) => {
  const { GOOGLE_TOKEN } = req.body;
  try {
    const { nombre, img, correo } = await googleVerify(GOOGLE_TOKEN);
    let user = await Usuario.findOne({ correo });
    if (!user) {
      const data = {
        nombre,
        correo,
        password: ":v",
        img,
        google: true,
        rol: "USER_ROLE",
      };

      user = new Usuario(data);
      await user.save();
    }
    if (!user.estado) {
      return res.status(401).json({
        msg: "Usuario bloqueado, hable con el ADMIN.",
      });
    }
    const token = await generarJTW(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "ALGO ESTA MAL",
    });
  }
};

export { login, googleSignIn };
