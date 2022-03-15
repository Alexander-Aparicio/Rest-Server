const {Router} =require('express')
const { check } = require('express-validator')
const { categoriGet, categoriGetId, categoriPost, categoriPutId, categoriDelete } = require('../controllers/categorias')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { categoriaValida } = require('../helpers/validarCategoria')

const router = Router()

router.get('/', categoriGet)

router.get('/:id', [
    check('id','No es el id de Mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(categoriaValida)
] ,categoriGetId)

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , categoriPost)

router.put('/:id', categoriPutId)

router.delete('/:id', categoriDelete)

module.exports = router