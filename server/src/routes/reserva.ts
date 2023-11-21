import {Router} from 'express';
import { getReserva, getReservas, newReserva } from '../controllers/reserva';

const router = Router();

router.post('/',newReserva);
router.get('/cod_reserva',getReserva);
router.get('/list',getReservas);

export default router;