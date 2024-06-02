import express from 'express';
import {
  getAllMetodos,
  getMetodoById,
  createMetodo,
  updateMetodo,
  deleteMetodo,
} from '../controllers/metodos_de_pago.controller';

const router = express.Router();

router.get('/metodos', getAllMetodos);
router.get('/metodos/:id', getMetodoById);
router.post('/metodos', createMetodo);
router.put('/metodos/:id', updateMetodo);
router.delete('/metodos/:id', deleteMetodo);

export default router;