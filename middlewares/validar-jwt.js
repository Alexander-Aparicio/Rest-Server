const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
// un middleware se dispara con tres argumentos
const validarJWT = async(req= request, res=response, next)=>{

    const token = req.header('x-token')

    if(!token ){
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const {uid} =jwt.verify(token, process.env.SECRETPRIVATEKEY)
        console.log(`El valor de: ${uid}`)
        req.uid = uid

        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msj:'Token No válido - Usuario BORRADO'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msj:'Token No válido - Usuario con estado: FALSE'
            })
        }

        req.usuario = usuario
        
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'No hay token en la aplicación'
        })
    }

}

module.exports = {validarJWT}