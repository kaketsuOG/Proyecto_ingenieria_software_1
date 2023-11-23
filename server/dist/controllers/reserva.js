"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservas = exports.getReserva = exports.newReserva = void 0;
const reserva_1 = require("../models/reserva");
const newReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { celular_cliente, patente_vehiculo, cod_det_estado, cod_disponibilidad } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    try {
        yield reserva_1.Reserva.create({
            CELULAR_CLIENTE: celular_cliente,
            COD_DISPONIBILIDAD: cod_disponibilidad,
            PATENTE_VEHICULO: patente_vehiculo,
            COD_DET_ESTADO: cod_det_estado,
            FECHA_CREACION: fechaFormateada
        });
        console.log(fechaFormateada);
        return res.json({ msg: 'Reserva creado correctamente' });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newReserva = newReserva;
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    const idReserva = yield reserva_1.Reserva.findOne({ where: { COD_RESERVA: cod_reserva } });
    if (!idReserva) {
        return res.status(400).json({
            msg: 'La reserva no existe'
        });
    }
    try {
        res.json(idReserva);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva,
            error
        });
    }
});
exports.getReserva = getReserva;
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listReservas = yield reserva_1.Reserva.findAll();
    res.json(listReservas);
});
exports.getReservas = getReservas;
