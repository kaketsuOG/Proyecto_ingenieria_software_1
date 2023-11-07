import { Router } from 'express';
import {createDetUsuarioVehiculo, getDetUsuarioVehiculos, getDetUsuarioVehiculo, deleteDetUsuarioVehiculo} from '../controllers/det_usuario_vehiculo';

const router = Router();

// Ruta para crear una nueva relación entre usuario y vehículo
router.post('/', createDetUsuarioVehiculo);

// Ruta para obtener todas las relaciones entre usuario y vehículo
router.get('/list', getDetUsuarioVehiculos);

// Ruta para obtener una relación entre usuario y vehículo por su código
router.get('/:COD_USUARIO_VEHICULO', getDetUsuarioVehiculo);

// Ruta para eliminar una relación entre usuario y vehículo por su código
router.delete('/:COD_USUARIO_VEHICULO', deleteDetUsuarioVehiculo);

export default router;
