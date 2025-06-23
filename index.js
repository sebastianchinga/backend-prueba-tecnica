import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import db from './config/db.js';
import tasksRoutes from './routes/tasksRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json())

db.authenticate().then(() => console.log('Database connected')).catch(e => console.log(e))

const dominiosPermitidos = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Hacemos uso de cors
app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/tareas', tasksRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})