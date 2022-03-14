const { request } = require('express')
const {response} = require('express')

const categoriGet = (req, res = response)=>{

    res.json({
        msj:'get API - CONTROLADOR'
    })

}

const categoriGetId = (req = request, res= response)=>{

    const {id} = req.params

    res.json({
        msj:`categoria de ID = ${id}`
    })

}

const categoriPutId = (req = request, res= response)=>{

    const {id} = req.params

    res.json({
        msj:`categoria de ID = ${id} para actualizar`
    })

}

const categoriPost = (req = request, res= response)=>{

    res.json({
        msj:`petición post`,
        body: req.body
    })

}

const categoriDelete = (req = request, res= response)=>{

    const {id} = req.params

    res.json({
        msj:`categoria de ID = ${id} a eliminar`
    })

}

module.exports = {
    categoriGet,
    categoriGetId,
    categoriPutId,
    categoriDelete,
    categoriPost
}