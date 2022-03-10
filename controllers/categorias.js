const {response} = require('express')

const categoriGet = (req, res = response)=>{

    res.json({
        msj:'get API - CONTROLADOR'
    })

}

module.exports = {
    categoriGet
}