const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){

        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            categorias:'/api/categoria',
            usuarios:'/api/usuarios'
        }

        this.middlewares()

        this.routes()

        this.conectarDB()

    }

    async conectarDB(){
        await dbConnection()
    }

    routes(){

        this.app.use( this.paths.categorias, require('../routes/categorias') )
        this.app.use( this.paths.usuarios, require('../routes/usuarios') )
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