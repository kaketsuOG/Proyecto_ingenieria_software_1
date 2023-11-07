"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dispo_fecha_1 = require("../controllers/dispo_fecha");
const router = (0, express_1.Router)();
router.get('/list', dispo_fecha_1.getDisponibilidad_fechas);
router.post('/', dispo_fecha_1.newDispoFecha);
router.get('/:codigo', dispo_fecha_1.getDispoFecha);
router.delete('/:codigo', dispo_fecha_1.deleteDispoFecha);
router.put('/:codigo', dispo_fecha_1.updateDispoFecha);
exports.default = router;