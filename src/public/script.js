const notify = document.querySelector('#notification');
const image = document.getElementById('image');
const messageBar = document.querySelector('#message-bar');
const socket = io();

socket.on('start', data => {
  console.log(data);
  notify.textContent = data;
  messageBar.style.opacity = '100%';
});

image.innerHTML = `<img src="/last-img">`;

socket.on('generated', data => {
  console.log(data);
  image.innerHTML = `<img src="/last-img?${Date.now()}"><span class="description">${data}</span>`;
  messageBar.style.opacity = '0%';
});
