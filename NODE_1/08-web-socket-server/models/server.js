import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { createServer } from "http";
import { Server as Servidor } from "socket.io";
import { socketController } from "../sockets/controller.js";
//import { router } from "../routes/users.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = new Servidor(this.server);
    this.paths = {};

    this.middlewares();
    this.routes();
    this.sockets();
  }

  middlewares() {
    //Directorio publico
    this.app.use(express.static("./public"));
    this.app.use(cors());
  }

  routes() {
    //this.app.use(this.paths.usuarios, router);
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Listening in http://localhost:${this.port}`)
    );
  }
}

export { Server };
