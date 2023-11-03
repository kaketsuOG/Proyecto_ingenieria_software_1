import {Router} from 'express';
import validateToken from './validate-token';
import { deleteSucursal, getSucursal, getSucursales, newSucursal, updateSucursal } from '../controllers/sucursal';

const router = Router();

router.get('/list',getSucursales);
router.post('/',newSucursal);
router.get('/:cod_sucursal',getSucursal);
router.delete('/:cod_sucursal',deleteSucursal);
router.put('/:cod_sucursal',updateSucursal);

export default router;