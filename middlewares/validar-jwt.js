const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            'msg' : 'No tiene autorización'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        // leet el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'El usuario no existe'
            });
        }

        //Validar si el usuario está activo
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no válido'
            });
        }

        req.usuario = usuario;
        
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            msg:'Token no válido'
        })
    }

    
}


module.exports = {
    validarJWT
}