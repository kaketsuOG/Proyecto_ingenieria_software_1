
import {Router} from 'express';
import {newInventario,updateInventario,agregarProductos,quitarProductos,getInventario,getInventarios} from '../controllers/inventario'
import validateToken from './validate-token';

const router = Router();

router.post('/',newInventario);
router.get('/list',getInventarios);
router.put('/:cod_inventario',updateInventario);
router.patch('/agregar/:cod_inventario',agregarProductos);
router.patch('/quitar/:cod_inventario',quitarProductos);
router.get('/:cod_inventario',getInventario);



export default router;