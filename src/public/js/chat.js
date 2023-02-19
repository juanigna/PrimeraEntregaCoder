const socket = io();
let user;
let chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById('sendBtn');

//Alerta encargada del user
Swal.fire({
  title: 'Log In',
  input: "text",
  text: 'Ingrese con un usuario para identificarse en el chat ',
  inputValidator: (value) => {
    return !value && "Por favor identifiquese para continuar"
  },
  allowOutsideClick: false
  
}).then(result => 
  user = result.value )


  chatBox.addEventListener("keyup",e => {
    if(e.key == "Enter") {
      if(chatBox.value.trim().length > 0) {
        //Evento encargado de mandar el nuevo mensaje con su data
        socket.emit('message', {user:user,message: chatBox.value});
        chatBox.value= "";
      }
    }
  })
  sendBtn.addEventListener("click",e => {
    
      if(chatBox.value.trim().length > 0) {
        //Evento encargado de mandar el nuevo mensaje con su data
        socket.emit('message', {user:user,message: chatBox.value});
        chatBox.value= "";
      }
    
  })
  

  socket.on("messageLive",(data) => {
    let log = document.getElementById("messageLogs");
    let messages= "";
    data.forEach(message => {
      messages = messages + `${message.user} dice ${message.message} </br>`
      
    });
    log.innerHTML = messages;
  })
 