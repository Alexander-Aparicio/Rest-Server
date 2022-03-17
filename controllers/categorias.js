const { request } = require('express')
const {response} = require('express')
const { Categoria} = require('../models')


const categoriGet = async (req=request , res = response)=>{

    const { limit=5, desde=0} = req.query
    const query = {estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
            .populate('usuario','nombre')
    ])

    res.json({
        total,
        categorias
    })

}

const categoriGetId = async (req = request, res= response)=>{

    const {id} = req.params
    
    const categoria  = await Categoria.findById(id).populate('usuario','nombre')

    res.json({
        categoria
    })

}

const categoriPutId = async (req = request, res= response)=>{

    const {id} = req.params
    const { estado, usuario, ...data } = req.body

    // transformamos todo a mayúsculas
    data.nombre = data.nombre.toUpperCase()
    // cambiamos en id del usuario por el que esta realizando la actualización
    data.usuario = req.usuario._id

    // Actualizamos la categoria
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true})

    res.json({
        categoria
    })

}

const categoriPost = async (req = request, res= response)=>{

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){

        return res.status(400).json({

            msj:`La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    // Generamos la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    // Guardar en DB
    await categoria.save()

    // 201 cuando se crea algo
    res.status(201).json(categoria)

}

const categoriDelete = async (req = request, res= response)=>{

    const {id} = req.params

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado: false},{new:true})

    res.json({
        categoriaBorrada
    })

}

module.exports = {
    categoriGet,
    categoriGetId,
    categoriPutId,
    categoriDelete,
    categoriPost
}