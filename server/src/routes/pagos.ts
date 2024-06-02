import express from 'express';
import {
  getAllPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
} from '../controllers/pagos.controller';

const router = express.Router();

router.get('/pagos', getAllPagos);
router.get('/pagos/:id', getPagoById);
router.post('/pagos', createPago);
router.put('/pagos/:id', updatePago);
router.delete('/pagos/:id', deletePago);

export default router;