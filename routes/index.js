import express from 'express';
import { buscar, cambiar, crear, filtrar, home } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', home); // Mostrar tasks
router.post('/new-task', crear); // Crear task
router.get('/find-task/:id', buscar); // Encontrar task
router.put('/change-task/:id', cambiar); // Cambiar estado del task
router.get('/filter-task/:estado', filtrar); // Filtrar tasks por estado

export default router