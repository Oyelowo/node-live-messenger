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

socket.on('newLocationMessage', function (message) {
    let li = document.createElement('li');
    let a = document.createElement('a')
    setAttributes(a,{'target': '_blank','href': message.url})
    a.innerText='My current location';
    li.innerText = `${message.from}`
    li.appendChild(a);
    document.getElementById('messages').appendChild(li);
});

// Vanilla Javascript
let form = document.getElementById('message-form');
form.addEventListener("submit", (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document
            .querySelector('[name=message]')
            .value
    }, () => {});
})

// jQuery format jQuery('#message-form').on('submit', function (e) {
// e.preventDefault(); socket.emit('createMessage', {         from: 'User',
// text: jQuery('[name=message]').val()     }, function () {}); });
//
// Vanilla Javascript
let locationEvent = () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    navigator
        .geolocation
        .getCurrentPosition((position) => {
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            alert('Unable to fetch location');
        })
}
locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', locationEvent)

// jQuery let locationButton = jQuery('#send-location'); //
// locationButton.on('click', function () {     if (!navigator.geolocation) {
// return alert('Geolocation not supported by your browser!');     } navigator
// .geolocation         .getCurrentPosition(function (position) {
// console.log(position);             socket.emit('createLocationMessage', {
// latitude: position.coords.latitude,                 longitude:
// position.coords.longitude             });         }, function () {
// alert('Unable to fetch location');         }) })