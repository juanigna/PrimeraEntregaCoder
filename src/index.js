import { Server } from "socket.io"
import app from "./app.js"
import { MessageDao } from "./dao/messages.dao.js"

const Message = new MessageDao()

//Mocked Array for the messages
let messages = [];


// Main function to initialize the server
const main = async () => {
  const httpServer = app.listen(app.get('port'), () => {
    console.log('listening on port ' + app.get('port'))
  })

  global.io = new Server(httpServer);

  app.get('/chat', async (req, res) => {
    res.render('chats.handlebars')
  })

  app.delete('/chat', async (req, res) => {
    try {
      await Message.deleteMany();
      res.status(200).json({ message: 'Deleted messages' })
    } catch (e) {
      console.log(e)
    }
  });

  io.on("connection", (socket) => {
    socket.on('message', async (data) => {
      try {

        const newMessage = {
          user: data.user,
          message: data.message
        };

        const response = await Message.create(newMessage);

        messages.push(data)
        //Evento que manda el mensaje en vivo al chat
        io.emit('messageLive', messages);
      } catch (e) {
        console.error(e);
      }
    });


  });

  
}

main();