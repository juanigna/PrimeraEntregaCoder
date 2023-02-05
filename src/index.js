import { Server } from "socket.io"
import app  from "./app.js"

// Main function to initialize the server
const main = () => {
    const httpServer = app.listen(app.get('port'), () => {
        console.log('listening on port ' + app.get('port'))
    })  

    const socketServer = new Server(httpServer);

    socketServer.on('connection', socket => {
        console.log("New client")
    })
}

main();