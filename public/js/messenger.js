let socket = io();

function scrollToBottom() {
    let messages = document.getElementById('messages');
    let newMessage = messages.lastElementChild;
    let clientHeight = messages.clientHeight
    let scrollTop = messages.scrollTop
    let scrollHeight = messages.scrollHeight;
    let newMessageHeight = parseFloat(window.getComputedStyle(newMessage).height);

    lastMessageHeight = newMessage.previousElementSibling
        ? parseFloat(window.getComputedStyle(newMessage.previousElementSibling).height)
        : 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
};

socket.on('connect', function () {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disonnected from server');
});

socket.on('updateUserList', function (users) {
    let ol = document.createElement('ol');
    users.forEach(function (user) {
        let li = document.createElement('li');
        li.innerText = user;
        ol.appendChild(li);

    });
    let usersElement = document.getElementById('users');
    usersElement.innerHTML = '';
    usersElement.appendChild(ol);
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
});

let form = document.getElementById('message-form');
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let messageTextBox = document.querySelector('[name=message]')
    socket.emit('createMessage', {
        text: messageTextBox.value
    }, () => {
        messageTextBox.value = ''
    });
});

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
