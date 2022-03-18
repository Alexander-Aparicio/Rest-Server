const { response, request } = require("express");
const { categoriaValida } = require("../helpers/validarCategoria");
const { Producto, Categoria } = require("../models");


const getProdutos = async (req = request, res= response)=>{

    const { limit=5, desde=0 }= req.query

    const query = {estado:true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
            .populate('categoria','nombre')
            .populate('usuario','nombre')
    ])

    res.json({
        total,
        productos
    })
}

const getProductoId = async ( req=request, res=response)=>{

    const {id}= req.params


    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')

    res.json(producto)

}

const postProducto = async (req=request, res= response)=>{

    const nombre = req.body.nombre.toUpperCase()
    
    const categoria = req.body.categoria.toUpperCase()
    const {precio, descripcion,disponible} = req.body

    const productoN = await Producto.findOne({nombre})
    const existeCategoria = await Categoria.findOne({nombre:categoria})
    

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
    const { estado, usuario, ...data } = req.body

    if(data.nombre){data.nombre = data.nombre.toUpperCase()}
    if(data.categoria){
        data.categoria = data.categoria.toUpperCase()
        const verificandoCategoria = await Categoria.findOne({nombre:data.categoria})

        if(!verificandoCategoria){
            return res.json({
                msj: `No existe la Categoria ${data.categoria}, debes crear la categoria antes`
            })
        }else{
            data.categoria = verificandoCategoria._id
        }
    }


    data.usuario = req.usuario._id
    const productoActualizado = await Producto.findByIdAndUpdate(id,data,{new: true})

    res.json(productoActualizado)

}

const deleteProducto = async (req=request, res= response)=>{

    const {id} = req.params

    const productoverificado = await Producto.findOne({id,estado:false})

    if(productoverificado){
        return res.status(401).json({msj:'El producto ya está eliminado'})
    }

    const productoEliminado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

    res.json({productoEliminado:productoEliminado})
}

module.exports = {
    getProdutos,
    getProductoId,
    postProducto,
    putProducto,
    deleteProducto
}