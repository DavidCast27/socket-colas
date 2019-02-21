const fs = require('fs');
const { Ticket } = require('./ticket')

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.tickets = [];
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
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

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }


}

module.exports = {
    TicketControl
}