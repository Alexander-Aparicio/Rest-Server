const bcryptjs = require('bcryptjs')
const { request,response } = require('express')
const { googleVerify } = require('../helpers/google-verify')
const { generarJWT } = require('../helpers/generar-jwt')
const Usuario = require('../models/usuario')

const login = async( req, res=response )=>{

    const {correo, password} = req.body
    console.log(correo)
    try {
        
        // Verificar si el email existe.
        const usuario = await Usuario.findOne({correo})
        console.log(correo)

        if(!usuario){

            return res.status(400).json({
                msg: 'Usuario Ó Password no son correctos'
            })

        }

        // Verificar si el usuario esta activo
        if(!usuario.estado){

            return res.status(400).json({
                msg:'INACTIVO'
            })

        }

        // verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password)

        if( !validaPassword ){

            return res.status(400).json({
                msg: 'INCORRECTO -> password'
            })

        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)
        

        res.json({
            usuario,
            token
        })

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            msg:'hable con el administrador'
        })

    }

}

const googleSignIn = async( req=request, res= response)=>{

    const { id_token }= req.body

    try {
        
        const {nombre, img, correo} = await googleVerify(id_token)
        // const googleUser = await googleVerify(id_token)

        // console.log(nombre, img, correo)
        // console.log(googleUser)

        let usuario = await Usuario.findOne({correo})

        if( !usuario ){
            // Si no existe el usuario creamos
            const data = {
                nombre,
                correo,
                password:'P',
                img,
                google:true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        // Si el usuario en DB 
        if( !usuario.estado ){

            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })

        }
        // GenerAER EL JWT(token)
        const token = await generarJWT( usuario.uid )

        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log(error)
        
        res.status(400).json({
            ok:false,
            msg:'El token no se puede verificar'
        })

    }

}

module.exports = {
    login,
    googleSignIn
}