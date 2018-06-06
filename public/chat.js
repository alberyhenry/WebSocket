const socket = io.connect('localhost:4000');
let output =   document.getElementById('output'),
    handle =   document.getElementById('handle'),
    message =  document.getElementById('message'),
    btn =      document.getElementById('send'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', ()=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

// Typing Message
setInterval(
message.addEventListener("keypress", ()=>{
  if(!handle.value){
    let soma = 14;
    socket.emit('typing', soma);
  }else{
    socket.emit('typing', handle.value);
  }
  
}), 1000);

socket.on('chat', data =>{
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong> ${data.handle} : </strong> ${data.message} </p>`;
});
// Typing Broadcast
socket.on('typing', data =>{
  if(data === 14){feedback.innerHTML = ""}
  else{feedback.innerHTML = `<p><em> ${data} is typing message ...</em></p>`}
});