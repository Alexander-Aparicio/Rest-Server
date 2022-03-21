const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async(req=request, res=response)=>{

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        res.status(400).send('No hay archivo cargado')
        return 
    }

    try {

        const nombreArchivo = await subirArchivo(req.files,['txt','md'],'new documents')
        res.json({nombreArchivo})
        
    } catch (msg) {

        res.status(400).json({msg})
    }
}

const mostrarImagen = async (req, res= response)=>{

    const {id, coleccion} = req.params

    res.json({
        id,
        coleccion
    })

}

module.exports = {
    cargarArchivo,
    mostrarImagen
}