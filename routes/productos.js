const { Router } = require("express");
const { check } = require("express-validator");
const { getProdutos, getProductoId, postProducto, putProducto, deleteProducto } = require("../controllers/productos");
const { categoriaValida } = require("../helpers/validarCategoria");
const { productoValido } = require("../helpers/validarProducto");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRol } = require("../middlewares/validarRoll");


const router = Router()

router.get('/', getProdutos)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(productoValido)
] ,getProductoId)

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    validarCampos
] ,postProducto)

router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(productoValido)
] ,putProducto)

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(productoValido),
    validarRol,
    validarCampos
] ,deleteProducto)

module.exports = router
