const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuarios = async (termino = '', res = response)=>{
    console.log('buscando usuario');
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: [usuario]
        });
    }

    const regex = new RegExp(termino,'i');
    
    const usuarios = await Usuario.find({
        $or: [{ nombre : regex }, { correo : regex }],
        $and: [{ estado:true }]
    });

    res.json({
        results: usuarios
    });
    
}

const buscarCategorias = async (termino = '', res = response)=>{
    console.log('buscando categoría');
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: [categoria]
        });
    }

    const regex = new RegExp(termino,'i');
    
    const categorias = await Categoria.find({        
        $and: [{ estado:true }, { nombre : regex }]
    });

    res.json({
        results: categorias
    });
    
}

const buscarProductos = async (termino = '', res = response)=>{
    console.log('buscando producto');
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino);
        return res.json({
            results: [producto]
        });
    }

    const regex = new RegExp(termino,'i');
    
    const productos = await Producto.find({        
        $and: [{ estado:true }, { nombre : regex }]
    });

    res.json({
        results: productos
    });
    
}


const buscar = (req, res = response) => {

    const {coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch(coleccion){
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            res.status(500).json({
                msg:'Se le olvido hacer esta búsqueda'
            });
    }
}


module.exports = {
    buscar
}