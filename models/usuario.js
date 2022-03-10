const { Schema, model } = require('mongoose')

const UsuarioShema = Schema({

    nombre: {
        type: String,
        required:[true, 'El nombre es obligatosrio']
    },
    correo: {
        type:String,
        required:[true, 'El correro es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatorio']
    },
    img: {
        type:String 
    },
    rol: {
        type:String,
        required:true,
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    GOOGLE: {
        type: Boolean,
        default: false
    }

})

UsuarioShema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.toObject()
    return usuario
}

module.exports = model('Usuario', UsuarioShema)
// model(nombre de colección , UsuarioShema)
// Mongoose agregará una 's' al nombre de la colección
// Se exporta una función