var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio')
var label = $('small');
$('h1').text(`Escritorio ${escritorio}`)

$('button').on('click', function() {
    socket.emit('atenderTickect', { escritorio }, function(resp) {
        if (resp.err) {
            $('h4').text(resp.mensaje)
        } else {
            label.text(resp.mensaje)
        }

    })
})