import { Router } from 'express';
import { getReserva, getReservas, newReserva, updateReserva, deleteReserva, getMasVendido } from '../controllers/reserva';
import auth from './auth';

const router = Router();

// Endpoint para crear una nueva reserva
router.post('/', newReserva);

// Endpoint para obtener la lista de reservas
router.get('/list', getReservas);

// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', getReserva);

// Endpoint para actualizar una reserva por su código
router.put('/:cod_reserva', updateReserva);

// Endpoint para eliminar una reserva por su código
router.delete('/:cod_reserva', deleteReserva);

router.get('/reporte/masvendido',getMasVendido);

export default router;