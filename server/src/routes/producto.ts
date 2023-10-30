
import {Router} from 'express';
import { deleteProducto, getProducto, getProductos, newProducto, updateProducto } from '../controllers/producto';
import validateToken from './validate-token';

const router = Router();

router.get('/list',getProductos);
router.post('/',newProducto);
router.get('/:cod_producto',getProducto);
router.delete('/:cod_producto',deleteProducto);
router.put('/:cod_producto',updateProducto);


export default router;