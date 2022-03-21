const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, mostrarImagen } = require("../controllers/uploads");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router()

router.post('/', cargarArchivo )

router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], mostrarImagen)

module.exports = router