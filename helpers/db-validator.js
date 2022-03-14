const { response, request  } = require('express')
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol})

    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado`)
    }
}

const emailValido = async (req = request, res = response)=>{

    const {correo} = body.req

    const existeEmail = await Usuario.findOne({correo})

    if(existeEmail){
        // return res.status(400).json({
        //     msg: 'este correo ya esta registrado'
        // })
        throw new Error(`Este correo ya está registrado`)
    }

}

const idlValido = async (id)=>{

    // Verificar si el correo existe
    const existeId = await Usuario.findById(id)
    
    if( !existeId ){
       throw new Error(`El ID: ${id}, no existe`)
    }

}

module.exports = {
    esRolValido,
    emailValido,
    idlValido
}