import express from 'express';
import {
  getAllDepositos,
  getDepositoById,
  createDeposito,
  updateDeposito,
  deleteDeposito,
} from '../controllers/deposito.controller';

const router = express.Router();

router.get('/depositos', getAllDepositos);
router.get('/depositos/:id', getDepositoById);
router.post('/depositos', createDeposito);
router.put('/depositos/:id', updateDeposito);
router.delete('/depositos/:id', deleteDeposito);

export default router;