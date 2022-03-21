const { response } = require("express");
const { request } = require("express");
const { v4: uuidv4 } = require('uuid');


const cargarArchivo = (req=request, res=response)=>{

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        res.status(400).send('No hay archivo cargado')
        return 
    }

    const {archivo}=req.files
    const partesDeNombre = archivo.name.split('.')
    const extension = partesDeNombre[partesDeNombre.length-1]

    // Validación de la extensión
    const extensionesValidas = ['png','jpg','gif','jpeg']

    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg:`La extensión ${extension} no es valida, solo se acepta los siguiente formatos ${extensionesValidas}`
        })
    }


    const nombreTemp = uuidv4()+'.'+extension


    const uploadPath = `${__dirname}/../uploads/${nombreTemp}`

    archivo.mv(uploadPath, function(err){

        if(err){
            return res.status(500).json({err})
        }

        res.json({msg: uploadPath})
    })

    console.log('documento', req.files)

}

module.exports = {
    cargarArchivo
}