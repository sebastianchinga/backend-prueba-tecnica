import express from 'express';
import { buscar, cambiar, crear, filtrar, home } from '../controllers/taskController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', checkAuth, home); // Mostrar tasks
router.post('/new-task', checkAuth, crear); // Crear task
router.get('/find-task/:id', checkAuth, buscar); // Encontrar task
router.put('/change-task/:id', checkAuth, cambiar); // Cambiar estado del task
router.get('/filter-task/:estado', checkAuth, filtrar); // Filtrar tasks por estado

export default router