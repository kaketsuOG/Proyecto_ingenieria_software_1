import { Router } from 'express';
import { getPedidos, getPedido, newPedido, updatePedido, deletePedido } from '../controllers/det_reserva_producto'; // Ajusta la ruta según tu estructura

const router = Router();

// Obtener todos los pedidos
router.get('/', getPedidos);

// Obtener un pedido por ID
router.get('/:cod_pedido', getPedido);

// Crear un nuevo pedido
router.post('/', newPedido);

// Actualizar un pedido por ID
router.put('/:cod_pedido', updatePedido);

// Eliminar un pedido por ID
router.delete('/:cod_pedido', deletePedido);

export default router;