import {Router} from 'express';
import { newReserva } from '../controllers/reserva';

const router = Router();

router.post('/',newReserva);

export default router;