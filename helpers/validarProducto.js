const { Producto} = require("../models")

const productoValido = async ( id = '')=>{

    const existeProducto = await Producto.findOne({id})

    if(!existeProducto){

        throw new Error(`El producto ${id} no existe`)

    }

}

module.exports = {
    productoValido
}