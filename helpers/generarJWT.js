import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    return jwt.sign({id}, 'palabrasupersecreta', {
        expiresIn:'1h'
    })
}