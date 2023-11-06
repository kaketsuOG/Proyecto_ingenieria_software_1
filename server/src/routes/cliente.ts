import { Router } from 'express';
import { createCliente, getClientes, getCliente, deleteCliente, updateCliente } from '../controllers/cliente';

const router = Router();

// Ruta para crear un nuevo cliente
router.post('/', createCliente);

// Ruta para obtener la lista de clientes
router.get('/list', getClientes);

// Ruta para obtener un cliente por su número de celular
router.get('/:CELULAR_CLIENTE', getCliente);

// Ruta para eliminar un cliente por su número de celular
router.delete('/:CELULAR_CLIENTE', deleteCliente);

// Ruta para actualizar los datos de un cliente por su número de celular
router.put('/:CELULAR_CLIENTE', updateCliente);

export default router;
