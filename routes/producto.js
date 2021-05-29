const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProductos,obtenerProducto,crearProducto, actualizarProducto, borrarProducto } = require("../controllers/productoController");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { existeCategoriaPorId, existeProductoPorId, productoNombreExiste } = require('../helpers/bd-validators');

const router = Router();

//Obtener todas las productos - Publico
router.get('/',obtenerProductos);

//Obtener una producto por id - Publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto);

//Crear producto - Privado cualquier rol
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoría es obligatoria').notEmpty(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

//Actualizar producto - Privado cualquier rol
router.put('/:id',[
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    // check('nombre', 'El nombre es obligatorio').notEmpty(),
    // check('nombre').custom(productoNombreExiste),
    // check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarProducto);

//Borrar producto - Privado solo admin
router.delete('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    validarJWT,
    check('id').custom(existeProductoPorId),
    esAdminRole,
    validarCampos
],borrarProducto);


module.exports = router;