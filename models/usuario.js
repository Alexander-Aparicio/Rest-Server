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
        default:'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    google: {
        type: Boolean,
        default: false
    },
    estado:{
        type:Boolean,
        default:true
    }

})

UsuarioShema.methods.toJSON = function(){
    const { __v, _id, password, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model('Usuario', UsuarioShema)
// model(nombre de colección , UsuarioShema)
// Mongoose agregará una 's' al nombre de la colección
// Se exporta una función