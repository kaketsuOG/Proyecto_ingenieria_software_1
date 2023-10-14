import {Router} from 'express';
import {  loginUser, newUser, getUsers,getUser,deleteUser, updateUser } from '../controllers/user';
import { updateRol } from '../controllers/rol';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser)
router.get('/list',getUsers);
router.get('/:rut_usuario',getUser);
router.delete('/:rut_usuario',deleteUser);
router.put('/:rut_usuario',updateUser);

export default router;