"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Endpoint para crear una nueva reserva
router.post('/', auth_1.default, reserva_1.newReserva);
// Endpoint para obtener la lista de reservas
router.get('/', auth_1.default, reserva_1.getReservas);
// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', auth_1.default, reserva_1.getReserva);
// Endpoint para actualizar una reserva por su código
router.put('/:cod_reserva', auth_1.default, reserva_1.updateReserva);
// Endpoint para eliminar una reserva por su código
router.delete('/:cod_reserva', auth_1.default, reserva_1.deleteReserva);
exports.default = router;
