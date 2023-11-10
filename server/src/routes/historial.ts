import { Router } from 'express';
import { createHistorial, getHistoriales, getHistorial, deleteHistorial, updateHistorial } from '../controllers/historial';

const router = Router();

// Ruta para crear un nuevo historial
router.post('/', createHistorial);

// Ruta para obtener la lista de historiales
router.get('/list', getHistoriales);

// Ruta para obtener un historial por su código
router.get('/:COD_HISTORIAL', getHistorial);

// Ruta para eliminar un historial por su código
router.delete('/:COD_HISTORIAL', deleteHistorial);

// Ruta para actualizar los datos de un historial por su código
router.put('/:COD_HISTORIAL', updateHistorial);

export default router;
