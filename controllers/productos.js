const { response, request } = require("express");
const { Producto, Categoria } = require("../models");


const getProdutos = async (req = request, res= response)=>{

    // const { limit=5, desde=0 }= req.query

    // const query = {estado:true}

    console.log(Producto)

    // const [total, productos] = await Promise.all([
    //     Producto.countDocuments(),
    //     Producto.find(query)
    //         .skip(Number(desde))
    //         .limit(Number(limit))
    //         .populate('categoria','nombre') 
    // ])

    res.json({
        // total,
        // productos
        msj:'HOLA'
    })

}

const getProductoId = async ( req=request, res=response)=>{

    const {id}= req.params

    res.json({
        msj:`Aquí estaraá el producto con id = ${id}`
    })

}

const postProducto = async (req=request, res= response)=>{

    const nombre = req.body.nombre.toUpperCase()
    
    const categoria = req.body.categoria.toUpperCase()
    const {precio, descripcion,disponible} = req.body

    const productoN = await Producto.findOne({nombre})
    const existeCategoria = await Categoria.findOne({nombre:categoria})
    const nombreCategoria  = await Categoria.find({nombre:categoria})
    console.log( `VERIFICANDO: ${existeCategoria}`)

    if(productoN){

        return res.status(400).json({

            msj:`El producto de nombre ${productoN.nombre} ya esta creado`

        })

    }

    if(!existeCategoria){

        return res.status(400).json({

            msj:`La categoría de nombre ${categoria} no existe`

        })

    }

    // Generamos la data del producto a crear
    const newProducto = {
        nombre,
        categoria:existeCategoria._id,
        precio,
        descripcion,
        disponible,
        usuario:req.usuario._id
    }

    const producto = new Producto(newProducto)

    await producto.save()

    // const pp = {
    //     nombre,
    //     categoria,
    //     precio,
    //     descripcion,
    //     disponible,
    //     usuario:req.usuario._id
    // }
    // producto.categoria = categoria
    // console.log(productoCreado)

    res.status(201).json(producto)

}

const putProducto = async (req=request,res= response)=>{

    const {id} = req.params

    res.json({
        msj: `Actualizando producto con id= ${id}`
    })

}

const deleteProducto = async (req=request, res= response)=>{

    const {id} = req.params

    res.json({
        msj: `Eliminando producto con id = ${id}`
    })

}

module.exports = {
    getProdutos,
    getProductoId,
    postProducto,
    putProducto,
    deleteProducto
}