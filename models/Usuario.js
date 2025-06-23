import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/db.js";
import { generarToken } from "../helpers/generarToken.js";

const Usuario = db.define('usuarios', {
    nombre:{
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING,
        defaultValue: generarToken
    },
    confirmado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
})

Usuario.prototype.comprobarPassword = async function (formPass) {
    return await bcrypt.compare(formPass, this.password);
}

export default Usuario