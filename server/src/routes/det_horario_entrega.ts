import { Router } from "express";
import { getDetalle_horario_entregas, getHorarioEntrega, newHorarioEntrega, updateHorarioEntrega, deleteHorarioEntrega } from "../controllers/det_horario_entrega";
import validateToken from "./validate-token";

const router = Router();

router.get('/list', getDetalle_horario_entregas);
router.post('/', newHorarioEntrega);
router.get('/:codigo', getHorarioEntrega);
router.delete('/:codigo', deleteHorarioEntrega);
router.put('/:codigo', updateHorarioEntrega);


export default router;