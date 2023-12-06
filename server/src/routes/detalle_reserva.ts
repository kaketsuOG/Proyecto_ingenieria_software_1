import { Router } from 'express';
import { getDetallesReserva, getDetalleReserva, newDetalleReserva, updateDetalleReserva, deleteDetalleReserva } from '../controllers/detalle_reserva';
import auth from './auth';

const router = Router();

// Obtener todos los detalles de reserva
router.get('/list',getDetallesReserva);

// Obtener un detalle de reserva por ID
router.get('/:cod_detalle_reserva',getDetalleReserva);

// Crear un nuevo detalle de reserva
router.post('/',newDetalleReserva);

// Actualizar un detalle de reserva por ID
router.put('/:cod_detalle_reserva',updateDetalleReserva);

// Eliminar un detalle de reserva por ID
router.delete('/:cod_detalle_reserva',deleteDetalleReserva);

export default router;