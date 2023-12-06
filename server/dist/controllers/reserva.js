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
exports.deleteReserva = exports.updateReserva = exports.getReservas = exports.getReserva = exports.newReserva = void 0;
const reserva_1 = require("../models/reserva");
const newReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    try {
        const reserva = yield reserva_1.Reserva.create({
            CELULAR_CLIENTE,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente',
            TOTAL: 0,
        });
        return res.json({
            msg: 'Reserva creada correctamente',
            reserva,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
});
exports.newReserva = newReserva;
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }
        res.json(reserva);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva,
            error,
        });
    }
});
exports.getReserva = getReserva;
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listReservas = yield reserva_1.Reserva.findAll();
        res.json(listReservas);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las reservas',
            error,
        });
    }
});
exports.getReservas = getReservas;
const updateReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE } = req.body;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }
        yield reserva.update({
            CELULAR_CLIENTE,
        });
        res.json({
            msg: 'Reserva actualizada correctamente',
            reserva,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la reserva ' + cod_reserva,
            error,
        });
    }
});
exports.updateReserva = updateReserva;
const deleteReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }
        yield reserva.destroy();
        res.json({
            msg: 'Reserva eliminada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la reserva ' + cod_reserva,
            error,
        });
    }
});
exports.deleteReserva = deleteReserva;
