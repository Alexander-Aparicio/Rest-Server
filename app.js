require('dotenv').config()
const Server = require('./models/server')

const server = new Server()

server.listen()


// const wellcom = "Hola a todos amigos"
// console.log(wellcom)