const {Router} = require('express')
const { check } = require('express-validator')
const {usuarioPost} = require('../controllers/usuarios')
const { esRolValido } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const Role = require('../models/role')


const router = Router()

// Observación: (rol)=> esRolValido(rol) , esta expresión puede escribirse solo como : esRolValido

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de más de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom(esRolValido),
    validarCampos
],usuarioPost)

module.exports = router