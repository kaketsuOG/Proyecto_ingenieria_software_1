import { Router } from 'express';
import { getReserva, getReservas, newReserva, updateReserva, deleteReserva, getMasVendido, getVentasPorMes} from '../controllers/reserva';
import auth from './auth';

const router = Router();

router.post('/', newReserva);

router.get('/list', getReservas);

router.get('/:cod_reserva', getReserva);

router.put('/:cod_reserva', updateReserva);

router.delete('/:cod_reserva', deleteReserva);

router.get('/reporte/masvendido',getMasVendido);

router.get('/reporte/ventaspormes',getVentasPorMes);


export default router;