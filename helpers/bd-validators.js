const Role = require('../models/role');
const Usuario = require('../models/usuario');



//Verificar si el usuario existe
const existeUsuarioPorId = async(id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe`);
    }
}

const esRoleValido = async (role = '')=>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

//Verificar si el correo existe
const correoExiste = async(correo = '')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El correo ya está registrado`);
    }
}

module.exports = {
    existeUsuarioPorId,
    esRoleValido,
    correoExiste
}

