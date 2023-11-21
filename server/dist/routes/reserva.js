"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const router = (0, express_1.Router)();
router.post('/', reserva_1.newReserva);
exports.default = router;
