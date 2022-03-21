const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas =['png','jpg','gif','jpeg'], carpeta='')=>{

    return new Promise( (resolve, reject)=>{

        const {archivo}= files
        const partesDeNombre = archivo.name.split('.')
        const extension = partesDeNombre[partesDeNombre.length-1]
    
        // Validación de la extensión
        if(!extensionesValidas.includes(extension)){

            return reject(`La extensión ${extension} no es valida, solo se acepta los siguiente formatos ${extensionesValidas}`)
    
        }
    
    
        const nombreTemp = uuidv4()+'.'+extension
    
    
        const uploadPath =  carpeta!='' ? `${__dirname}/../uploads/${carpeta}/${nombreTemp}`: `${__dirname}/../uploads/${nombreTemp}`
    
        archivo.mv(uploadPath, function(err){
    
            if(err){
                reject({err})
            }
    
            resolve(nombreTemp)
        })

    } )

}

module.exports = {
    subirArchivo
}