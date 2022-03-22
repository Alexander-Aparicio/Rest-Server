const { MAX_ACCESS_BOUNDARY_RULES_COUNT } = require("google-auth-library/build/src/auth/downscopedclient")


const coleccionesPermitidas = (coleccion = '', colecciones=[])=>{

    const incluida = colecciones.includes(coleccion)
    if(!incluida){
        throw new Error(`La colección ${coleccion} no está permitida`)
    }

    return true

}

module.exports = {
    coleccionesPermitidas
}