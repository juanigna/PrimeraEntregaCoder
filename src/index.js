const app = require("./app")

const main = () => {
    app.listen(app.get('port'), () => {
        console.log('listening on port ' + app.get('port'))
    })  
}

main();