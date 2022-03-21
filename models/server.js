const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){

        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            categorias:'/api/categorias',
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            productos:'/api/productos',
            buscar:'/api/buscar',
            uploads:'/api/uploads'
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
        this.app.use( this.paths.auth, require('../routes/auth') )
        this.app.use( this.paths.productos, require('../routes/productos') )
        this.app.use( this.paths.buscar, require('../routes/buscar') )
        this.app.use( this.paths.uploads, require('../routes/uploads') )
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

        // Fileupload -carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }))

    }

    listen(){

        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })

    }

}

module.exports = Server