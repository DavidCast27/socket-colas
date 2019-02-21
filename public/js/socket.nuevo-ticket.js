//comando para establecer conexion

var socket = io();

var lblNuevoTicket = $('#lblNuevoTicket');

// escuchar eventos
socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('se perdio la conexion con el servidor');
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        lblNuevoTicket.text(siguienteTicket)
    });
})