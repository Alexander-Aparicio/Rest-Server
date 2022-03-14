const {Router} = require('express')
const { check } = require('express-validator')
const {usuarioPost, putUsuarios, deleteUsuarios, getUsuarios} = require('../controllers/usuarios')
const { esRolValido, emailValido, idlValido  } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validaRoles } = require('../middlewares/validarRoll')
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
// -------------------------------------------
router.delete('/:id',[
    validarJWT,
    // validarRol,
    validaRoles('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(idlValido),
    validarCampos
]
,deleteUsuarios)

router.get('/', getUsuarios )

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(idlValido),
    validarCampos
] ,putUsuarios)

module.exports = router