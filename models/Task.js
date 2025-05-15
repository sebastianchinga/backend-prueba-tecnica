import { Sequelize } from "sequelize";
import db from "../config/db.js";

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
    }
}, {
    timestamps: false
})

export default Task;