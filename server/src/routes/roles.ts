

import {Router} from 'express';
import {getRol,newRol,updateRol,deleteRol,getOneRol} from '../controllers/rol';
import validateToken from './validate-token';

const router = Router();

router.get('/list',getRol);
router.post('/',newRol);
router.get('/:cod_rol',getOneRol);
router.delete('/:cod_rol',deleteRol);
router.put('/:cod_rol',updateRol);

export default router;