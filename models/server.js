const express = require('express')
const cors = require('cors')

class Server {

    constructor(){

        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            categorias:'/api/categoria'
        }

        this.middlewares()

        this.routes()

    }

    routes(){

        this.app.use( this.paths.categorias, require('../routes/categorias') )
        this.app.get('/',(req, res)=>{
            res.send('Hello Wordl')
        })

    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Parseo y lectura del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static('public'))

    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })

    }

}

module.exports = Server