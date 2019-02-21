const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticket = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
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

});