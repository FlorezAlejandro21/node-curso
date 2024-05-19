import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}
export class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];
    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  async init() {
    const { hoy, ultimo, ultimos4, tickets } = JSON.parse(
      fs.readFileSync(new URL("../db/data.json", import.meta.url))
    );
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDB();
    }
  }

  guardarDB() {
    const pathSaveData = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(pathSaveData, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    this.tickets.push(new Ticket(this.ultimo, null));
    this.guardarDB();
    return `Ticket #${this.ultimo}`;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets[0];
    this.tickets.shift();
    ticket.escritorio = escritorio;
    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }
    this.guardarDB();

    return ticket;
  }
}
