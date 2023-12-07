"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const router = (0, express_1.Router)();
// Endpoint para crear una nueva reserva
router.post('/', reserva_1.newReserva);
// Endpoint para obtener la lista de reservas
router.get('/list', reserva_1.getReservas);
// Endpoint para obtener una reserva por su código
router.get('/:cod_reserva', reserva_1.getReserva);
// Endpoint para actualizar una reserva por su código
router.put('/:cod_reserva', reserva_1.updateReserva);
// Endpoint para eliminar una reserva por su código
router.delete('/:cod_reserva', reserva_1.deleteReserva);
router.get('/reporte/masvendido', reserva_1.getMasVendido);
exports.default = router;
