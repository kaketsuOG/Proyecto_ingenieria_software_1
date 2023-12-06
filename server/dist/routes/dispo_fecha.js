"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dispo_fecha_1 = require("../controllers/dispo_fecha");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', auth_1.default, dispo_fecha_1.getDisponibilidad_fechas);
router.post('/', auth_1.default, dispo_fecha_1.newDispoFecha);
router.get('/:codigo', auth_1.default, dispo_fecha_1.getDispoFecha);
router.delete('/:codigo', auth_1.default, dispo_fecha_1.deleteDispoFecha);
router.put('/:codigo', auth_1.default, dispo_fecha_1.updateDispoFecha);
exports.default = router;
