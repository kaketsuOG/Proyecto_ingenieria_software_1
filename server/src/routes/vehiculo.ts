import { Router } from 'express';
import { newVehiculo, getVehiculos, getVehiculo, deleteVehiculo, updateVehiculo } from '../controllers/vehiculo';

const router = Router();

// Ruta para crear un nuevo vehículo (requiere token)
router.post('/', newVehiculo); // Comenta temporalmente la validación de token

// Ruta para obtener la lista de vehículos (requiere token)
router.get('/list', getVehiculos); // Comenta temporalmente la validación de token

// Ruta para obtener un vehículo por su patente (requiere token)
router.get('/:patente_vehiculo', getVehiculo); // Comenta temporalmente la validación de token

// Ruta para eliminar un vehículo por su patente (requiere token)
router.delete('/:patente_vehiculo', deleteVehiculo); // Comenta temporalmente la validación de token

// Ruta para actualizar los datos de un vehículo por su patente (requiere token)
router.put('/:patente_vehiculo', updateVehiculo); // Comenta temporalmente la validación de token

export default router;
