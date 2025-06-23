import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Usuario from "./Usuario.js";

const Task = db.define('tareas', {
    titulo: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.TEXT
    },
    estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    usuarios_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    timestamps: false
})

export default Task;