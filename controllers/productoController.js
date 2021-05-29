const { response } = require("express");
const { Producto, Categoria } = require('../models');


//obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) =>{
    const { desde = 0, limite = 5} = req.query;
    const categorias = await Producto.find()
                        .skip(desde)
                        .limit(limite)
                        .populate("usuario");

    return res.json(categorias);
}

//obtenerProductos - populate
const obtenerProducto = async (req, res = response) =>{
    const {id} = req.params;

    const producto = await Producto.findById(id)
                            .populate("usuario");

    return res.json(producto);
}


const crearProducto = async (req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const {categoria, precio} = req.body;
    
    const categoriaId = categoria;

    const productoBD = await Producto.findOne({nombre}).populate("usuario");
    const categoriaBD = await Categoria.findById(categoriaId);

    if(productoBD){
        return res.status(400).json({
            msg: `El producto ${productoBD.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        categoria : categoriaBD,
        usuario: req.usuario._id,
        precio
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

// actualizarProducto - Comprobar si existe
const actualizarProducto = async (req, res = response) =>{
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    console.log(data);
   
    const producto = await Producto.findByIdAndUpdate(id, data, {new:true}).populate("usuario");

    res.json(producto);
}

// borrarProducto - estado:false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado:false}).populate("usuario");
    res.json({
        producto
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}