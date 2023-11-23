"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const router = (0, express_1.Router)();
router.post('/', reserva_1.newReserva);
router.get('/cod_reserva', reserva_1.getReserva);
router.get('/list', reserva_1.getReservas);
exports.default = router;
