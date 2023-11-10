
import {Router} from 'express';
import { agregarProductos, deleteProducto, getProducto, getProductos, newProducto, updateProducto, venderProductos } from '../controllers/producto';
import validateToken from './validate-token';

const router = Router();

router.get('/list',getProductos);
router.post('/',newProducto);
router.get('/:cod_producto',getProducto);
router.delete('/:cod_producto',deleteProducto);
router.put('/:cod_producto',updateProducto);
router.patch('/agregar/:cod_producto',agregarProductos);
router.patch('/vender/:cod_producto',venderProductos);


export default router;