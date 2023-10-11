import { response } from "express";

const usuariosGET = (req, res = response) => {
  const query = req.query;
  res.json({
    msg: "Response GET of /api from controller",
    query
  });
};

const usuariosPOST = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "Response POST of /api from controller",
    data: body,
  });
};

const usuariosPUT = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "Response PUT of /api from controller",
    id,
  });
};

const usuariosDELETE = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Response DELETE of /api from controller",
  });
};
export { usuariosGET, usuariosPOST, usuariosPUT, usuariosDELETE };
