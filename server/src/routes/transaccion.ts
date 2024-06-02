import express from 'express';
import {
  getAllTransacciones,
  getTransaccionById,
  createTransaccion,
  updateTransaccion,
  deleteTransaccion,
} from '../controllers/transaccion.controller';

const router = express.Router();

router.get('/transacciones', getAllTransacciones);
router.get('/transacciones/:id', getTransaccionById);
router.post('/transacciones', createTransaccion);
router.put('/transacciones/:id', updateTransaccion);
router.delete('/transacciones/:id', deleteTransaccion);

export default router;