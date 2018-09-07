let socket = io();

function scrollToBottom() {
    let messages = document.getElementById('messages');
    let newMessage = messages.lastElementChild;
    let clientHeight = messages.clientHeight
    let scrollTop = messages.scrollTop
    let scrollHeight = messages.scrollHeight;
    let newMessageHeight = parseFloat(window.getComputedStyle(newMessage).height);
    console.log('newMessageHeight', newMessageHeight);
    // console.log(newMessage.previousElementSibling);

    lastMessageHeight = newMessage.previousElementSibling
        ? parseFloat(window.getComputedStyle(newMessage.previousElementSibling).height)
        : 0;

    console.log('lastMessageHeight', lastMessageHeight);

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
    //  let messages = $('#messages'); let newMessage =
    // messages.children('li:last-child'); let clientHeight =
    // messages.prop('clientHeight'); let scrollTop = messages.prop('scrollTop');
    // let scrollHeight = messages.prop('scrollHeight'); let newMessageHeight =
    // newMessage.innerHeight(); console.log('newMessageHeight', newMessageHeight);
    // let lastMessageHeight = newMessage     .prev()     .innerHeight(); if
    // (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    // scrollHeight) { messages.scrollTop(scrollHeight); }
};

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document
        .querySelector('#message-template')
        .innerHTML;
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    document
        .querySelector('#messages')
        .innerHTML += html;
    scrollToBottom();

    // // Vanilla Javascript let li = document.createElement('li'); li.innerText =
    // `${message.from} ${formattedTime}: ${message.text}`; document
    // .getElementById('messages')     .appendChild(li); jQuery let li =
    // $('<li></li>'); li.text(`${message.from}: ${message.text}`);
    // $('#messages').append(li)

});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document
        .querySelector('#location-message-template')
        .innerHTML;
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    document
        .querySelector('#messages')
        .innerHTML += html;
    scrollToBottom();

    // let li = document.createElement('li'); let a = document.createElement('a')
    // setAttributes(a, {     'target': '_blank',     'href': message.url }) let
    // formattedTime = moment(message.createdAt).format('h:mm a'); a.innerText =
    // formattedTime +' My current location '; li.innerText = `${message.from}`
    // li.appendChild(a); document     .getElementById('messages') .appendChild(li);
});

// Vanilla Javascript
let form = document.getElementById('message-form');
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let messageTextBox = document.querySelector('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value
    }, () => {
        messageTextBox.value = ''
    });
});

// jQuery format jQuery('#message-form').on('submit', function (e) {
// e.preventDefault(); socket.emit('createMessage', {         from: 'User',
// text: jQuery('[name=message]').val()     }, function () {}); });
//
// Vanilla Javascript
locationButton = document.querySelector('#send-location');
let locationEvent = () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.setAttribute('disabled', 'disabled');
    locationButton.innerText = 'Shariing location...';

    navigator
        .geolocation
        .getCurrentPosition((position) => {
            locationButton.removeAttribute('disabled');
            locationButton.innerText = 'Share location';
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            locationButton.setAttribute('disabled', 'disabled')
            locationButton.innerText = 'Share location';
            alert('Unable to fetch location');
        })
}
locationButton.addEventListener('click', locationEvent)

// jQuery let locationButton = jQuery('#send-location'); //
// locationButton.on('click', function () {     if (!navigator.geolocation) {
// return alert('Geolocation not supported by your browser!');     } navigator
// .geolocation         .getCurrentPosition(function (position) {
// console.log(position);             socket.emit('createLocationMessage', {
// latitude: position.coords.latitude,                 longitude:
// position.coords.longitude             });         }, function () {
// alert('Unable to fetch location');         }) })