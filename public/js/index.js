let socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function () {
    console.log('whatsup');
})

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});

socket.emit('createMessage', {
    from: 'Sakari',
    text: 'Mita mene?'
}, function (data) {
    console.log('Gotcha! ', data);
});