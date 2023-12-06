import { Router } from "express";
import { getDetalle_horario_entregas, getHorarioEntrega, newHorarioEntrega, updateHorarioEntrega, deleteHorarioEntrega } from "../controllers/det_horario_entrega";
import auth from "./auth";

const router = Router();

router.get('/list', auth, getDetalle_horario_entregas);
router.post('/', auth, newHorarioEntrega);
router.get('/:codigo', auth, getHorarioEntrega);
router.delete('/:codigo', auth, deleteHorarioEntrega);
router.put('/:codigo', auth, updateHorarioEntrega);


export default router;