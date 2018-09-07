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
    // Vanilla Javascript
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;
    document
        .getElementById('messages')
        .appendChild(li);

    // jQuery let li = $('<li></li>'); li.text(`${message.from}: ${message.text}`);
    // $('#messages').append(li)

});

// Vanilla Javascript
let form = document.getElementById('message-form');
form.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document .querySelector('[name=message]') .value
    }, () => {});
})

// jQuery format jQuery('#message-form').on('submit', function (e) {
// e.preventDefault(); socket.emit('createMessage', {         from: 'User',
//    text: jQuery('[name=message]').val()     }, function () {}); });
