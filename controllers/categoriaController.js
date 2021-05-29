const { response } = require("express");
const { Categoria } = require('../models');


//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) =>{
    console.log('Categorias');
    const { desde = 0, limite = 5} = req.query;
    console.log(limite);
    const categorias = await Categoria.find()
                        .skip(Number(desde))
                        .limit(Number(limite))
                        .populate("usuario");                        

    console.log(limite);

    return res.json(categorias);
}

//obtenerCategorias - populate
const obtenerCategoria = async (req, res = response) =>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id)
                            .populate("usuario");

    return res.json(categoria);
}


const crearCategoria = async (req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();

    const categoriaBD = await Categoria.findOne({nombre}).populate("usuario");

    if(categoriaBD){
        return res.status(400).json({
            msg: `La categoria ${categoriaBD.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);
}

// actualizarCategoria - Comprobar si existe
const actualizarCategoria = async (req, res = response) =>{
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
   
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true}).populate("usuario");

    res.json(categoria);
}

// borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}).populate("usuario");
    res.json({
        categoria
    });

    

}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}