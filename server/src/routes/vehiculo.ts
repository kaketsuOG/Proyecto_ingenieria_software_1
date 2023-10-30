import { Router } from 'express';
import { newVehiculo, getVehiculos, getVehiculo, deleteVehiculo, updateVehiculo } from '../controllers/vehiculo';
import validateToken from './validate-token'; // Importa el middleware de validación de token

const router = Router();

// Ruta para crear un nuevo vehículo (requiere token)
router.post('/', validateToken, newVehiculo);

// Ruta para obtener la lista de vehículos (requiere token)
router.get('/list', validateToken, getVehiculos);

// Ruta para obtener un vehículo por su patente (requiere token)
router.get('/:patente_cod_vehiculo', validateToken, getVehiculo);

// Ruta para eliminar un vehículo por su patente (requiere token)
router.delete('/:patente_cod_vehiculo', validateToken, deleteVehiculo);

// Ruta para actualizar los datos de un vehículo por su patente (requiere token)
router.put('/:patente_cod_vehiculo', validateToken, updateVehiculo);

export default router;
