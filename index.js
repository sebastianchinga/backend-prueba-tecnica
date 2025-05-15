import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import db from './config/db.js';
import router from './routes/index.js';

dotenv.config({ path: './.env' });

const app = express();

db.authenticate().then(() => console.log('Database connected')).catch(e => console.log(e))

const dominiosPermitidos = [process.env.URL_FRONTEND];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

// Hacemos uso de cors
app.use(cors(corsOptions))

app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})