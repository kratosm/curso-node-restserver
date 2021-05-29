const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategorias,obtenerCategoria,crearCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categoriaController");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { existeCategoriaPorId, categoriaNombreExiste } = require('../helpers/bd-validators');

const router = Router();

//Obtener todas las categorias - Publico
router.get('/',obtenerCategorias);

//Obtener una categoria por id - Publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria);

//Crear categoria - Privado cualquier rol
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria);

//Actualizar categoria - Privado cualquier rol
router.put('/:id',[
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(categoriaNombreExiste),
    validarCampos
], actualizarCategoria);

//Borrar categoria - Privado solo admin
router.delete('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    esAdminRole,
    validarCampos
],borrarCategoria);


module.exports = router;