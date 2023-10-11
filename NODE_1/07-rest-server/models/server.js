import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { router } from "../routes/users.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/users";
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("./public"));
    this.app.use(cors());
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.usuariosRoutePath, router);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening in http://localhost:${this.port}`)
    );
  }
}

export { Server };
