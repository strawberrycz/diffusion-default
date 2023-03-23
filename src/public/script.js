const notify = document.querySelector('#notification');
const message = document.querySelector('#message');
const button = document.querySelector('button');
const messageBar = document.querySelector('#message-bar');

function printMessage(e) {
  e.preventDefault();
  console.log(message.value);
}

button.addEventListener('click', printMessage);
