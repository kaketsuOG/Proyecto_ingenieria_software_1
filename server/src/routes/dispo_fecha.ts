import { Router } from "express";
import { getDispoFecha, getDisponibilidad_fechas, newDispoFecha, updateDispoFecha, deleteDispoFecha } from "../controllers/dispo_fecha";
import auth from "./auth";

const router = Router();

router.get('/list', auth, getDisponibilidad_fechas);
router.post('/', auth, newDispoFecha);
router.get('/:codigo', auth, getDispoFecha);
router.delete('/:codigo', auth, deleteDispoFecha);
router.put('/:codigo', auth, updateDispoFecha);


export default router;