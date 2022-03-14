
const { Schema, model } = require('mongoose')


const CategoriaShema = Schema({
    nombre: {
        type:String,
        required: [true,'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default:true,
        require:true 
    },
    usuario:{
        // type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
})

module.exports = model('Role', CategoriaShema)