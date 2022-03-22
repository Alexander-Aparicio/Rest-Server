const fs = require('fs');
const path = require('path')
const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async(req=request, res=response)=>{

    try {

        const nombreArchivo = await subirArchivo(req.files,['txt','md'],'new documents')
        res.json({nombreArchivo})
        
    } catch (msg) {

        res.status(400).json({msg})
    }
}

const mostrarImagen = async (req, res= response)=>{

    const {id, coleccion} = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo =await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con id ${id}`
                })
            }
            
        break;

        case 'productos':
            modelo =await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con id ${id}`
                })
            }
                
        break;
    
        default:
            return res.status(500).json({msg:'SE ME OLVIDO VALIDAR ETSO'})
    }

        // Limpiar imagen a cambiar
        if(modelo.img){
            // const pathImagen = `${__dirname}/../uploads/${coleccion}/${modelo.img}`
            const prob = `${path.dirname(`${__dirname}`)}`
            const pathImagen = path.join(__dirname,'..','uploads',coleccion, modelo.img)
 
            if( fs.existsSync(pathImagen)){
               return res.sendFile(pathImagen)
            }
        }else{
            const pathImagen = path.join(__dirname,'..','assets','no-image.jpg')
            return res.sendFile(pathImagen)
        }
    
        


}

const actualizarImagen = async (req, res=response)=>{

    const {id, coleccion} = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo =await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con id ${id}`
                })
            }
            
        break;

        case 'productos':
            modelo =await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con id ${id}`
                })
            }
                
        break;
    
        default:
            return res.status(500).json({msg:'SE ME OLVIDO VALIDAR ETSO'})
    }

    // Limpiar imagen a cambiar
    if(modelo.img){
        const pathImagen = `${__dirname}/../uploads/${coleccion}/${modelo.img}`

        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    const nombreImg = await subirArchivo(req.files, undefined, coleccion)
    modelo.img= nombreImg

    await modelo.save()

    res.json(modelo)
}

module.exports = {
    cargarArchivo,
    mostrarImagen,
    actualizarImagen
}