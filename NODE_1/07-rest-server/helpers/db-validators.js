import { role as Role } from "../models/role.js";
import { usuario as Usuario } from "../models/usuario.js";

export const isValidRole = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El role '${rol}', no esta en la DB registrado`);
  }
};

export const existEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo '${correo}', ya esxite en la DB`);
  }
};

export const existUserById = async (id) => {
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error(`El usuario con '${id}', no esxite en la DB`);
  }
};
