import mongoose from "mongoose"
import { Server } from "socket.io"
import app  from "./app.js"


// Main function to initialize the server
const main = () => {
    const httpServer = app.listen(app.get('port'), () => {
        console.log('listening on port ' + app.get('port'))
    })  

    global.io = new Server(httpServer);

    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://juani:juan44200@cluster0.zf75rie.mongodb.net/?retryWrites=true&w=majority', (error) => {
        if(error){
            console.log('error connecting to database');
        }
        console.log('connected to database')
    })
}

main();