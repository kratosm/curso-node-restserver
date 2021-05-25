const { Router } = require("express");
const { check } = require("express-validator");

const {validarCampos} = require('../middlewares/validar-campos')
const { existeUsuarioPorId, esRoleValido, correoExiste } = require("../helpers/bd-validators");

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require("../controllers/usuarioRestController");

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria ').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({min:6}),
    check('correo','El correo no tiene el formato correcto').isEmail(),
    check('correo').custom( correoExiste ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut);
router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
], usuariosDelete);
router.patch('/api', usuariosPatch);

module.exports = router;