export const socketController = (socket) => {
  console.log("Cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("enviar-msg", (payload, callback) => {
    const id = 122334;
    callback(id);
    socket.broadcast.emit("enviar-msg", payload);
  });
};
