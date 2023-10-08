import http from "http";

http
  .createServer((req, res) => {
    // res.setHeader('Content-Disposition', 'attachment; filename=prueba.csv')
    // res.writeHead(202, { "Content-Type": "application/csv" });
    
    res.write('Hola Mundo');
    res.end();
  })
  .listen(8080);

console.log("Escuchando en el port", 8080);
