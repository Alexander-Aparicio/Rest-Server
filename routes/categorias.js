const {Router} =require('express')
const { categoriGet } = require('../controllers/categorias')

const router = Router()

router.get('/', categoriGet)

module.exports = router