import { response, request } from "express";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const cargarArchivo = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    // req.files: archivos que se subieron, si no hay archivos subidos, entonces no se sube nada
    res.status(400).json({ msg: "No se subió ningún archivo" });
    return;
  }

  const { archivo } = req.files; // archivo: archivo que se subió
  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  const extensionesPermitidas = ["png", "txt"];
  if (!extensionesPermitidas.includes(extension)) {
    return res.status(400).json({ msg: "Extension no valida" });
  }

  const nombreTemp = uuidV4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "Archivo subido correctamente en: " + uploadPath });
  });
};
