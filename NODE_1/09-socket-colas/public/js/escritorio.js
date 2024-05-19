const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  throw new Error("El paramentro no existe");
}

const escritorio = searchParams.get("escritorio");

const numeroEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.getElementById("lblPendientes");

divAlerta.style.display = "none";
numeroEscritorio.innerText = escritorio;
const socket = io();

socket.on("connect", () => {
  //console.log("Conectado");
  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');
  btnAtender.disabled = true;
});

socket.on("tickets-pendientes", (cola) => {
  lblPendientes.innerText = cola;
});

btnAtender.addEventListener("click", () => {
  socket.emit(
    "atender-ticket",
    { escritorio },
    ({ status, atenderTickete }) => {
      if (!status) {
        lblTicket.innerText = "No hay nadie por atender";
        return (
          (divAlerta.style.display = ""), (lblPendientes.style.display = "none")
        );
      }
      lblTicket.innerText = `Ticket #${atenderTickete.numero}`;
    }
  );
  
});
