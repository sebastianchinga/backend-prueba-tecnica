import confirmarCuenta from "../helpers/enviarConfirmacion.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarToken } from "../helpers/generarToken.js";
import resetearPassword from "../helpers/resetearPassword.js";
import Usuario from "../models/Usuario.js";
import bcrypt, { genSalt } from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return res.status(400).json({ msg: error.message });
    }

    if (!usuario.confirmado) {
        const error = new Error('Confirma tu cuenta');
        return res.status(400).json({ msg: error.message });
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            id: usuario.nombre,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    } else {
        const error = new Error('Password incorrecto');
        res.status(400).json({ msg: error.message });
    }

}

export const registrar = async (req, res) => {
    const { email } = req.body

    const encontrado = await Usuario.findOne({ where: { email } })

    if (encontrado) {
        const error = new Error('Este usuario ya se registró');
        return res.status(400).json({ msg: error.message });
    }

    const usuario = new Usuario(req.body);
    // Hashear password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
    try {
        await usuario.save();
        await confirmarCuenta({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
        res.json({ msg: 'Te hemos enviado un e-mail' })
    } catch (error) {
        res.json({ msg: error })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token inválido');
        return res.status(400).json({ msg: error.message });
    }

    usuario.confirmado = true
    usuario.token = null;
    try {
        await usuario.save();
        res.json({ msg: 'Cuenta confirmada' });
    } catch (error) {
        const e = new Error('Hubo un error');
        return res.status(400).json({ msg: e.message });
    }
}

export const perfil = (req, res) => {
    const { usuario } = req;
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
    })
}

export const resetear = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('No se encontró este usuario');
        return res.status(400).json({ msg: error.message });
    }

    usuario.token = generarToken();
    try {
        await usuario.save();
        await resetearPassword({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
        res.json({ msg: 'Te hemos enviado instrucciones al e-mail' })
    } catch (error) {
        res.json(error);
    }
}

export const validarToken = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token inválido');
        return res.status(400).json({ msg: error.message });
    }

    res.json(usuario);
}

export const cambiarPassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Token inválido');
        return res.status(400).json({ msg: error.message });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null
    try {
        await usuario.save();
        res.json({msg: 'Password modificado'})
    } catch (error) {
        console.log(error)
    }

}