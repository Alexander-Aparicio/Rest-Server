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

const getUsuarios = async(req = request, res=response)=>{

    const { limit=5, desde=0 }= req.query
    const query = {estado: true}

    // const {q, nombre='no name', apikey} = req.query
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit)) 

    // const total = await Usuario.countDocuments()

    // Para optimizar el tiempo de proceso dado que usuarios y total no dependen, lo podemos
    // procesar de manera síncrona usuando Promise.all([]) , esto es muy útil dado que optimizamos tiempo y 
    // también si alguna de las dos falla dará un respuesta de falla global 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit)) 
    ])

    res.json({
        total,
        usuarios
        // msg:'get Api',
        // q,
        // nombre,
        // apikey
    })
}


const putUsuarios = async(req = request, res=response)=>{

    const {id} = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // validar contra la bd
    if(password){
        // encriptar constraseña
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }
    //findByIdAndUpdate encuentra y actualiza 
    const usuario = await Usuario.findByIdAndUpdate(id, resto,{new:true})

    res.json({
        usuario
    })
}

// const postUsuarios = async(req = request, res=response)=>{

//     const { nombre, correo, password, rol } = req.body
//     // console.log(Usuario)
//     const usuario = new Usuario({ nombre, correo, password })
//     console.log(usuario)
//     // Encriptar la contraseña
//     const salt = bcrypt.genSaltSync()
//     usuario.password = bcrypt.hashSync(password, salt)

//     // Guardar en db

//     await usuario.save()

//     res.json({usuario})
// }

const deleteUsuarios = async(req = request, res=response)=>{
    
    const { id } = req.params
    
    // Eliminado absoluto:
    // const usuario = await Usuario.findByIdAndDelete(id)

    // Eliminado parcial
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id,{estado:false},{new:true})
    console.log(`Usuario eliminado: ${req.usuario}`)

    const usuarioAuth = req.usuario
    
    res.json({usuarioEliminado, usuarioAuth})
}

const patchUsuarios =(req = request, res=response)=>{

    res.json({
        msg:'patch API'
    })
}

module.exports = {
    usuarioPost,
    deleteUsuarios,
    putUsuarios,
    getUsuarios
}