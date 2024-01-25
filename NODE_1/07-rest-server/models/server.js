import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { router } from "../routes/users.routes.js";
import { dbConnection } from "../db/config.js";
import { routerAuth } from "../routes/auth.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/users";
    this.authRoutePath = "/api/auth";
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
  }

  routes() {
    this.app.use(this.usuariosRoutePath, router);
    this.app.use(this.authRoutePath, routerAuth);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening in http://localhost:${this.port}`)
    );
  }
}

export { Server };
