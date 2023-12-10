import { Router } from 'express';
import { pdfReserva,getReserva, getReservas, newReserva, updateReserva, deleteReserva, getMasVendido, getVentasPorMes, getReservasByEstado, getReservasByCiudad, getDiaMasVendido} from '../controllers/reserva';
import auth from './auth';

const router = Router();

router.post('/', newReserva);

router.get('/list', getReservas);

router.get('/:cod_reserva', getReserva);

router.put('/:cod_reserva', updateReserva);

router.delete('/:cod_reserva', deleteReserva);

router.get('/estado/:estado', getReservasByEstado);

router.get('/ciudad/:ciudad', getReservasByCiudad);

router.post('/reporte/masvendido',getMasVendido);

router.post('/reporte/ventaspormes',getVentasPorMes);

router.get('/reporte/diamasvendido',getDiaMasVendido);

router.get('/generarpdf/:id',pdfReserva);
export default router;