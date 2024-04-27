import path from "path";
import { v4 as uuidV4 } from "uuid";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extensionesValidas = ["png", "txt"];
export const subirArchivo = (
  files,
  extensionesPermitidas = extensionesValidas,
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files; // archivo: archivo que se subió
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesPermitidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es valida, extensiones permitidas: [${extensionesPermitidas}]`
      );
    }

    const nombreTemp = uuidV4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(uploadPath);
    });
  });
};
