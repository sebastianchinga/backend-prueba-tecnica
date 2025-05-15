import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'shuttle.proxy.rlwy.net',
    port: '32546',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
})

export default db;