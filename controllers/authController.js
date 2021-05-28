const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req= request, res = response)=>{
    const { correo, password } = req.body;
    console.log(correo);
    try {
        //Verificar si el email existe

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos'
            });
        }

        //Verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos'
            });
        }

        //Verrificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos'
            });
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
    
}

const googleSingin = async (req, res= response) => {

    const { id_token } = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password:':p',
                img,
                google:true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado. Hable con el administrador'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Token de Google no es válido'
        });
    }

}


module.exports = {
    login,
    googleSingin
}