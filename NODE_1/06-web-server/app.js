import * as url from "url";
import express from "express";
import hbs from "hbs";
import dotenv from "dotenv/config";

const app = express();
const port = process.env.PORT;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "./views/partials", (err) => {});

//Servir contenido estatico
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Alejandro Florez",
    titulo: "Curso Node",
  });
});

app.get("/generic", (req, res) => {
  res.render("generic", {
    nombre: "Alejandro Florez",
    titulo: "Curso Node",
  });
});

app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "Alejandro Florez",
    titulo: "Curso Node",
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/public/404.html");
// });

app.listen(port, () => {
  console.log(`Example app listening  at http://localhost:${port}`);
});
