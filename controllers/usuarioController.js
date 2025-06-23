import { generarJWT } from "../helpers/generarJWT.js";
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
        res.json({ msg: 'Te hemos enviado un e-mail' })
    } catch (error) {
        res.json({ msg: error })
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('No existe token');
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