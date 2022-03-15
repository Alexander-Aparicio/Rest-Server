const { Categoria } = require("../models")

const categoriaValida = async ( id = '')=>{

    const existeCategoria = await Categoria.findOne({id})

    if(!existeCategoria){

        throw new Error(`La categoria ${id} no existe`)

    }

}

module.exports = {
    categoriaValida
}