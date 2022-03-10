const { response , request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuarioPost = async (req = request, res=response)=>{


    const {nombre,correo, password, rol} = req.body
    // Para recibir solo lo que nuestro esquema (shema) o modelo de usuario nos exige
    // hacemos lo siguiente:
    const usuario = new Usuario({nombre,correo, password,rol}) 
    console.log(password)

    // 
    // const existeEmail = await Usuario.findOne({correo})

    // if(existeEmail){
    //     return res.status(400).json({
    //         msg: 'este correo ya esta registrado'
    //     })
    // }

    // Encriptando la constraseña
    // salt es la variable que a través de la líbreria bcrypt dará la indicación
    // de la complejidad con la cuál queremos encriptar, está inidicación la podemos
    // dar a  tráves del método  genSaltSync(indicación), la indicación es un número 
    //que a mayor sea más complejidad se da a la encriptación, por defecto es 10.
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    // Grabando en la base de datos de mongo
    await usuario.save()

    res.json({
        usuario
    })

}

module.exports = {
    usuarioPost
}