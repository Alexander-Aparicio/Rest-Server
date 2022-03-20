const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } =require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
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

    const regex = new RegExp(termino, 'i')

    const usuario = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    })

    res.json({
        results:usuario
    })

}

const buscarCategoria = async( termino='', res=response)=>{
        
    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID){

        const categoria = await Categoria.find(termino)

        return res.json({
            results: (categoria) ? [categoria] :[]
        })

    }

    const regex = new RegExp(termino,'i')

    const categoria = await Categoria.find({nombre:regex, estado:true})

    res.json({results:categoria})

}

const buscarProducto = async (termino, res=response)=>{

    const esMongoID = ObjectId.isValid(termino)

    if(esMongoID){

        const producto = await Producto.find(esMongoID).populate('categoria','nombre')

        return res.json({
            results: (producto) ? [producto] :[]
        })
    }

    const regex = new RegExp(termino,'i')

    const producto = await Producto.find({nombre:regex, estado:true}).populate('categoria','nombre')

    res.json(producto)

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
        case 'categorias':
            buscarCategoria(termino,res)
        break;
        case 'productos':
            buscarProducto(termino,res)
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