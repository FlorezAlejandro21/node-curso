import { TicketControl } from "../models/ticket-control.js";

const ticket = new TicketControl();

export const socketController = (socket) => {
  socket.emit("ultimo-ticket", ticket.ultimo);
  socket.emit("estado-actual", ticket.ultimos4);
  socket.emit("tickets-pendientes", ticket.tickets.length);

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticket.siguiente();
    callback(siguiente);
    socket.broadcast.emit("tickets-pendientes", ticket.tickets.length);
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        msg: "Escritorio obligatorio",
        status: false,
      });
    }

    const atenderTickete = ticket.atenderTicket(escritorio);
    socket.broadcast.emit("tickets-pendientes", ticket.tickets.length);
    socket.emit("tickets-pendientes", ticket.tickets.length);
    socket.broadcast.emit("estado-actual", ticket.ultimos4);
    if (!atenderTickete) {
      callback({
        msg: "NO HAY TICTEK",
        status: false,
      });
    } else {
      callback({ status: true, atenderTickete });
    }
  });
};
