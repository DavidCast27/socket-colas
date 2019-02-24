var socket = io();


var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscrtorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    console.log(data);
    actualizarDatos(data.ultimos)
})


function actualizarDatos(ultimosCuatro) {
    for (let i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text(`Ticket  ${ultimosCuatro[i].numero}`)
        lblEscrtorios[i].text(`Escritorio  ${ultimosCuatro[i].escritorio}`)
    }
}