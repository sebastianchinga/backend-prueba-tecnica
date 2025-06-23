import express from 'express';
import { confirmar, login, registrar } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', login)
router.post('/registrar', registrar);
router.get('/confirmar/:token', confirmar);

export default router;