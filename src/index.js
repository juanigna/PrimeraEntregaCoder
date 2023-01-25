const app = require("./app")

// Main function to initialize the server
const main = () => {
    app.listen(app.get('port'), () => {
        console.log('listening on port ' + app.get('port'))
    })  
}

main();