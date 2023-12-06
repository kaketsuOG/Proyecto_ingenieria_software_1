import { Router } from "express";
import { getDispoFecha, getDisponibilidad_fechas, newDispoFecha, updateDispoFecha, deleteDispoFecha } from "../controllers/dispo_fecha";
import auth from "./auth";

const router = Router();

router.get('/list',getDisponibilidad_fechas);
router.post('/',newDispoFecha);
router.get('/:codigo',getDispoFecha);
router.delete('/:codigo',deleteDispoFecha);
router.put('/:codigo',updateDispoFecha);


export default router;