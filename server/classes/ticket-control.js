const fs = require('fs');
const { Ticket } = require('./ticket')

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatroTickets = []
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatroTickets = data.ultimosCuatroTickets;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket);
        this.grabarArchivo();
        return this.getUltimoTicket()
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimosTickets() {
        return this.ultimosCuatroTickets;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return {
                err: true,
                mensaje: "no hay tickets",
                ticket: {}
            }
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatroTickets.unshift(atenderTicket);

        if (this.ultimosCuatroTickets.length > 4) {
            this.ultimosCuatroTickets.splice(-1, 1)
        }
        this.grabarArchivo();
        return {
            err: false,
            mensaje: `ticket ${numeroTicket}`,
            ticket: atenderTicket
        };
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatroTickets = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatroTickets: this.ultimosCuatroTickets,
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}