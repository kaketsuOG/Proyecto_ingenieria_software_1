import { Router } from 'express';
import { getReserva, getReservas, newReserva } from '../controllers/reserva';

const router = Router();

// Endpoint para crear una nueva reserva
router.post('/new', newReserva);

// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', getReserva);

// Endpoint para obtener todas las reservas
router.get('/list', getReservas);

export default router;