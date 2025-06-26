import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.PALABRA_SECRETA);
            req.usuario = await Usuario.findOne({ where: { id: decoded.id } })
            return next();
        } catch (e) {
            const error = new Error('Token no válido');
            return res.status(403).json({ msg: error.message });
        }
    }

    if (!token) {
        const error = new Error('Token inexistente');
        res.status(400).json({ msg: error.message });
    }
    next();
}

export default checkAuth