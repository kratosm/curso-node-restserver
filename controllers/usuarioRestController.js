const {request, response} = require('express');
const usuariosGet = (req=request, res = response) => {

    const {q, nombre, apikey} = req.query

    res.json({
        'msg':'get API - controlador',
        q,
        nombre,
        apikey
    });
}
const usuariosPost = (req, res = response) => {

    const {nombre, id} = req.body;

    res.json({
        'msg':'Post API - controlador',
        nombre,
        id
    });
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        'msg':'Put API - controlador',
        id
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        'msg':'Pacth API - controlador'
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        'msg':'Delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}