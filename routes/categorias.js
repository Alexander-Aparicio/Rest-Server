const {Router} =require('express')
const { categoriGet, categoriGetId, categoriPost, categoriPutId, categoriDelete } = require('../controllers/categorias')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/', categoriGet)

router.get('/:id', categoriGetId)

router.post('/', [
    validarJWT
] ,categoriPost)

router.put('/:id', categoriPutId)

router.delete('/:id', categoriDelete)

module.exports = router