"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const det_horario_entrega_1 = require("../controllers/det_horario_entrega");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.get('/list', auth_1.default, det_horario_entrega_1.getDetalle_horario_entregas);
router.post('/', auth_1.default, det_horario_entrega_1.newHorarioEntrega);
router.get('/:codigo', auth_1.default, det_horario_entrega_1.getHorarioEntrega);
router.delete('/:codigo', auth_1.default, det_horario_entrega_1.deleteHorarioEntrega);
router.put('/:codigo', auth_1.default, det_horario_entrega_1.updateHorarioEntrega);
exports.default = router;
