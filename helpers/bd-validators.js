const { Categoria,Role,Usuario,Producto } = require('../models');

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

//Verificar si la categoria existe
const existeCategoriaPorId = async(id)=>{    
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe`);
    }   
}

//Verificar si el nombre de la categoria existe
const categoriaNombreExiste = async(nombre = '')=>{
    const existeNombre = await Categoria.findOne({nombre});
    if(existeNombre){
        throw new Error(`El nombre de la categoría ya está registrado`);
    }
}

//Verificar si la producto existe
const existeProductoPorId = async(id)=>{    
    console.log(id);
    const existeProducto = await Producto.findById(id);
    console.log(existeProducto);
    if(!existeProducto){
        throw new Error(`El id no existe`);
    }   
}

//Verificar si el nombre de la producto existe
const productoNombreExiste = async(nombre = '')=>{
    const existeNombre = await Producto.findOne({nombre});
    if(existeNombre){
        throw new Error(`El nombre de la categoría ya está registrado`);
    }
}

module.exports = {
    existeUsuarioPorId,
    esRoleValido,
    correoExiste,
    existeCategoriaPorId,
    categoriaNombreExiste,
    existeProductoPorId,
    productoNombreExiste
}

