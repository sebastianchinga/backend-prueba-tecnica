import express from 'express';
import { cambiarPassword, confirmar, login, perfil, registrar, resetear, validarToken } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', login)
router.post('/registrar', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', resetear)
router.route('/cambiar-password/:token').get(validarToken).post(cambiarPassword)

// Area privada
router.get('/perfil', checkAuth, perfil);

export default router;