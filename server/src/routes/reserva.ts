import { Router } from 'express';
import { getReserva, getReservas, newReserva, updateReserva, deleteReserva } from '../controllers/reserva';

const router = Router();

// Endpoint para crear una nueva reserva
router.post('/new', newReserva);

// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', getReserva);

// Endpoint para obtener todas las reservas
router.get('/list', getReservas);

// Endpoint para actualizar una reserva por su código
router.put('/:cod_reserva/update', updateReserva);

// Endpoint para eliminar una reserva por su código
router.delete('/:cod_reserva/delete', deleteReserva);

export default router;