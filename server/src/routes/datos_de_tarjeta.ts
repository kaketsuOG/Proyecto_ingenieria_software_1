import express from 'express';
import {
  getAllDatosTarjeta,
  getDatoTarjetaById,
  createDatoTarjeta,
  updateDatoTarjeta,
  deleteDatoTarjeta,
} from '../controllers/datos_de_tarjeta.controller';

const router = express.Router();

router.get('/datos-tarjeta', getAllDatosTarjeta);
router.get('/datos-tarjeta/:id', getDatoTarjetaById);
router.post('/datos-tarjeta', createDatoTarjeta);
router.put('/datos-tarjeta/:id', updateDatoTarjeta);
router.delete('/datos-tarjeta/:id', deleteDatoTarjeta);

export default router;