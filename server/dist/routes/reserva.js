"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const router = (0, express_1.Router)();
router.post('/', reserva_1.newReserva);
router.get('/list', reserva_1.getReservas);
router.get('/:cod_reserva', reserva_1.getReserva);
router.put('/:cod_reserva', reserva_1.updateReserva);
router.delete('/:cod_reserva', reserva_1.deleteReserva);
router.get('/estado/:estado', reserva_1.getReservasByEstado);
router.get('/ciudad/:ciudad', reserva_1.getReservasByCiudad);
router.get('/reporte/masvendido', reserva_1.getMasVendido);
router.get('/reporte/ventaspormes', reserva_1.getVentasPorMes);
router.get('/reporte/diamasvendido', reserva_1.getDiaMasVendido);
exports.default = router;
