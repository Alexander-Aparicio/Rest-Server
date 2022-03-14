const jwt = require('jsonwebtoken')

const generarJWT = (uid='')=>{

    return new Promise ( (resolve, reject) =>{

        const payload = {uid}

        // Esto crea un jsonwebtoken
        jwt.sign( payload, process.env.SECRETPRIVATEKEY,{
            expiresIn: '4h'
        },(err, token)=>{

            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve( token )
            }

        } )

    }
)}

module.exports = {generarJWT}