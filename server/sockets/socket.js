const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticket = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual', {
        actual: ticket.getUltimoTicket(),
        ultimos: ticket.getUltimosTickets()
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticket.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    client.on('atenderTickect', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario',
                ticket: {}
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio);
        callback(atenderTicket)
        if (!atenderTicket.err) {
            client.broadcast.emit('ultimosTickets', {
                actual: ticket.getUltimoTicket(),
                ultimos: ticket.getUltimosTickets()
            });
        }


    });

});