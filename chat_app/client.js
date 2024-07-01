const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('Notification_Ringtone.mp3');
const name = prompt("Enter your name to join");
if (name) {
    socket.emit('new-user-joined', name);
}

socket.on('user-joined', name => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('left');
    messageElement.innerText = `${name} joined the chat`;
    messageContainer.append(messageElement);
    audio.play();
});

socket.on('receive', data => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('left');
    messageElement.innerText = `${data.name}: ${data.message}`;
    messageContainer.append(messageElement);
    audio.play();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('right');
    messageElement.innerText = `You: ${message}`;
    messageContainer.append(messageElement);
    socket.emit('send', message);
    messageInput.value = '';
});
socket.on('left', name => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('left');
    messageElement.innerText = `${name} left the chat`;
    messageContainer.append(messageElement);
    audio.play();
});
