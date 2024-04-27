import { role as Role } from "../models/role.js";
import { usuario as Usuario } from "../models/usuario.js";
import { categoria as Categoria } from "../models/categoria.js";
import { producto as Producto } from "../models/producto.js";

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

export const existCategoriaById = async (id) => {
  const existCategoria = await Categoria.findById(id);
  if (!existCategoria) {
    throw new Error(`La categoria con '${id}', no esxite en la DB`);
  }
};

/**
 * Productos
 */
export const existProductoById = async (id) => {
  // Verificar si el correo existe
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La coleccion ${coleccion} no es valida`);
  }
  return true;
};
