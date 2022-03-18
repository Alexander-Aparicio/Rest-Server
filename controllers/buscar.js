const { request, response } = require("express");
const { Usuario } = require("../models");
const { ObjectId } =require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsusarios = async (termino='', res= response) =>{

    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] :[]
        })
    }

}

const buscador = async (req=request, res=response)=>{

    const {coleccion, termino } = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsusarios(termino,res)
        break;
        case 'categoria':
        break;
        case 'producto':
        break;
        default:
            res.status(500).json({
                msg:'Se le ovidó hacer esta búsqueda'
            })
    }

    // res.json({
    //     msj:'Lo que buscas estará aaquí pronto'
    // })

}

module.exports= {buscador}