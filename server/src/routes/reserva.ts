import { Router } from 'express';
import { getReserva, getReservas, newReserva, updateReserva, deleteReserva } from '../controllers/reserva';
import auth from './auth';

const router = Router();

// Endpoint para crear una nueva reserva
router.post('/', auth, newReserva);

// Endpoint para obtener la lista de reservas
router.get('/', auth, getReservas);

// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', auth, getReserva);

// Endpoint para actualizar una reserva por su código
router.put('/:cod_reserva', auth, updateReserva);

// Endpoint para eliminar una reserva por su código
router.delete('/:cod_reserva', auth, deleteReserva);

export default router;