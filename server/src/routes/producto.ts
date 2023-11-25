
import multer from 'multer'
import {Router} from 'express';
import { agregarProductos, deleteProducto, getProducto, getProductos, newProducto, updateProducto, venderProductos, uploadImagen } from '../controllers/producto';
import validateToken from './auth';

const router = Router();

const upload = multer({ dest: './uploads' }); // Ajusta la ruta según tu estructura

router.post('/', upload.single('imagen'), newProducto);
router.post('/:cod_producto/uploadImagen', upload.single('imagen'), uploadImagen);
router.get('/:cod_producto',getProducto);
router.delete('/:cod_producto',deleteProducto);
router.put('/:cod_producto',updateProducto);
router.patch('/agregar/:cod_producto',agregarProductos);
router.patch('/vender/:cod_producto',venderProductos);


export default router;