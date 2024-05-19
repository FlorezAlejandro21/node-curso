const online = document.getElementById("lblOnline");
const offline = document.getElementById("lblOffline");
const msg = document.querySelector("#txtMsg");
const enviar = document.querySelector("#btnEnviar");

const socket = io();

socket.on("connect", () => {
  console.log("Conectado");
  offline.style.display = "none";
  online.style.display = "";
});

socket.on("disconnect", () => {
  console.log("Desconectado");
  offline.style.display = "";
  online.style.display = "none";
});

socket.on("enviar-msg", (s,mensaje) => {
  console.log(mensaje);
});

enviar.addEventListener("click", () => {
  const txtMensaje = msg.value;

  const payload = {
    txtMensaje,
    id: "123ABC",
    fecha: new Date().getDate(),
  };

  socket.emit("enviar-msg", payload, (id) => {
    console.log("Envio el mensaje correctamente", id);
  });
});
