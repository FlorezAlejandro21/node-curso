import { Request, Response } from "express";

export const getUsuarios = (req: Request, res: Response) => {
  res.json({ msg: "Funcionando..." });
};

export const getUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, msg: "Funcionando..." });
};

export const postUsuario = (req: Request, res: Response) => {
  const { body } = req;
  res.json({ body, msg: "Funcionando..." });
};

export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({ id, body, msg: "Funcionando..." });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, msg: "Funcionando..." });
};
