import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    return jwt.sign({id}, process.env.PALABRA_SECRETA, {
        expiresIn:'1h'
    })
}