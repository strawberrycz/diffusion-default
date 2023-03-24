const notify = document.querySelector('#notification');
const message = document.querySelector('#message');
const button = document.querySelector('button');
const messageBar = document.querySelector('#message-bar');
const socket = io();

socket.on('response', data => {
  notify.textContent = data;
  messageBar.style.backgroundColor = '#3F4E4F';
  messageBar.style.height = '20vh';
});

function printMessage(e) {
  e.preventDefault();
  console.log(message.value);
  socket.emit('message', message.value);
}

button.addEventListener('click', printMessage);
