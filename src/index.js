import { Server } from "socket.io"
import app  from "./app.js"

// Main function to initialize the server
const main = () => {
    const httpServer = app.listen(app.get('port'), () => {
        console.log('listening on port ' + app.get('port'))
    })  

    global.io = new Server(httpServer);
    
    io.on('connection', socket => {
        console.log("New client")

        socket.on('message', data => {
            console.log(data)
        })
    })
}

main();