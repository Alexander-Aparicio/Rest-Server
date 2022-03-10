const { response } = require("express")
const { request } = require("express")
const { validationResult } = require("express-validator")

const validarCampos = (req = request, res=response, next)=>{

    const errors = validationResult(req)

    //.isEmpty : verifica si está vacío 
    // Si el objeto errors está vacío entonces errors.isEmpty()= true, entonces no hay necesidad de
    // mostrar o retornar los errores, ya que usamos un condicional if que ejecuta código cuando el valor
    // es true colocamos en la negación de errors.isEmpty() , es decir !errors.Empty()
    if( !errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()

}

module.exports ={validarCampos}