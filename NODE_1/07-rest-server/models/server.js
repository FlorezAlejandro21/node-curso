import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import fileUpload from "express-fileupload";
import { router } from "../routes/users.routes.js";
import { dbConnection } from "../db/config.js";
import { routerAuth } from "../routes/auth.routes.js";
import { routerCat } from "../routes/categorias.routes.js";
import { routerProducto } from "../routes/productos.routes.js";
import { routerUpload } from "../routes/uploads.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/users",
      categorias: "/api/categorias",
      productos: "/api/productos",
      uploads: "/api/uploads",
    };

    this.conectarDb();
    this.middlewares();
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("./public"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.paths.usuarios, router);
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.categorias, routerCat);
    this.app.use(this.paths.productos, routerProducto);
    this.app.use(this.paths.uploads, routerUpload);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening in http://localhost:${this.port}`)
    );
  }
}

export { Server };
