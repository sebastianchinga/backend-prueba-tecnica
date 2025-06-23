import express from 'express';
import { confirmar, login, perfil, registrar } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', login)
router.post('/registrar', registrar);
router.get('/confirmar/:token', confirmar);

// Area privada
router.get('/perfil', checkAuth, perfil);

export default router;