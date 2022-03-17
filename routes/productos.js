const { Router } = require("express");
const { check } = require("express-validator");
const { getProdutos, getProductoId, postProducto, putProducto, deleteProducto } = require("../controllers/productos");
const { categoriaValida } = require("../helpers/validarCategoria");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router()

router.get('/', getProdutos)

router.get('/:id', getProductoId)

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    validarCampos
] ,postProducto)

router.put('/:id', putProducto)

router.delete('/:id', deleteProducto)

module.exports = router
