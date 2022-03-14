const { request, response } = require("express");

const validarRol = (req=request, res=response , next)=>{

    const tipoUsuario=req.usuario

    if(!tipoUsuario){

        return res.status(500).json({
            msg:'Se quiere verificar el roll sin validar el token primero'
        })

    }

    if(tipoUsuario.rol !== 'ADMIN_ROLE'){

        return res.status(500).json({
            msg:'No es administrador, solo los administradores pueden realizar esta acción'
        })
    }

    next()

}

const validaRoles = (...roles)=>{

    return (req, res=response, next)=>{

        if( !req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el roll sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){

            return res.status(401).json({
                msg:`Para realizar está acción se requiere una de estos roles: ${roles}`
            })

        }

        next()

    }

}

module.exports = {
    validarRol,
    validaRoles
}