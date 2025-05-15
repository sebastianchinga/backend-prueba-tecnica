import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mysql",
    host: "127.0.0.1",
    port: '3306'
})

export default db;