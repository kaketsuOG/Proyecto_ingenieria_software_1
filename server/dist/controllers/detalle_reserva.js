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
exports.deleteDetalleReserva = exports.updateDetalleReserva = exports.newDetalleReserva = exports.getDetalleReserva = exports.getDetallesReserva = void 0;
const detalle_reserva_1 = require("../models/detalle_reserva");
const reserva_1 = require("../models/reserva");
const producto_1 = require("../models/producto");
// Obtener todos los detalles de reserva
const getDetallesReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallesReserva = yield detalle_reserva_1.DetalleReserva.findAll({
            include: [
                { model: reserva_1.Reserva, attributes: ['COD_RESERVA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_DETALLE_RESERVA', 'CANTIDAD', 'SUBTOTAL']
        });
        res.json(detallesReserva);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de reserva.' });
    }
});
exports.getDetallesReserva = getDetallesReserva;
// Obtener un detalle de reserva por ID
const getDetalleReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = yield detalle_reserva_1.DetalleReserva.findByPk(cod_detalle_reserva, {
            include: [
                { model: reserva_1.Reserva, attributes: ['COD_RESERVA'] },
                { model: producto_1.Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (detalleReserva) {
            res.json(detalleReserva);
        }
        else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de reserva.' });
    }
});
exports.getDetalleReserva = getDetalleReserva;
// Crear un nuevo detalle de reserva
const newDetalleReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva, cod_producto, cantidad } = req.body;
    const idProducto = yield producto_1.Producto.findOne({ attributes: ['PRECIO_PRODUCTO', 'CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_PRODUCTO: cod_producto } });
    const precioProducto = idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.PRECIO_PRODUCTO;
    const subTotal = precioProducto * cantidad;
    const idReserva = yield reserva_1.Reserva.findOne({ attributes: ['TOTAL'], where: { COD_RESERVA: cod_reserva } });
    const total = idReserva === null || idReserva === void 0 ? void 0 : idReserva.dataValues.TOTAL;
    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        });
    }
    if (!idReserva) {
        return res.status(400).json({
            msg: "La reserva ingresada no existe"
        });
    }
    if (cantidad == 0) {
        return res.status(400).json({
            msg: "Debes ingresar un valor correcto"
        });
    }
    const cantidadInt = parseInt(cantidad, 10);
    const cantidadDisponible = (idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.CANTIDAD_DISPONIBLE) - cantidadInt;
    if (cantidadDisponible < 0) {
        return res.status(400).json({
            msg: 'No hay Stock suficiente',
        });
    }
    try {
        yield detalle_reserva_1.DetalleReserva.create({
            COD_RESERVA: cod_reserva,
            COD_PRODUCTO: cod_producto,
            CANTIDAD: cantidad,
            SUBTOTAL: subTotal
        });
        yield reserva_1.Reserva.update({
            TOTAL: total + subTotal
        }, { where: { COD_RESERVA: cod_reserva } });
        yield producto_1.Producto.update({
            CANTIDAD_DISPONIBLE: cantidadDisponible
        }, { where: { COD_PRODUCTO: cod_producto } });
        res.json({
            msg: 'Pedido realizado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error al hacer el pedido"
        });
    }
});
exports.newDetalleReserva = newDetalleReserva;
// Actualizar un detalle de reserva por ID
const updateDetalleReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_reserva } = req.params;
    const { cod_reserva, cod_producto, cantidad, subtotal } = req.body;
    try {
        const detalleReserva = yield detalle_reserva_1.DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            yield detalleReserva.update({
                COD_RESERVA: cod_reserva,
                COD_PRODUCTO: cod_producto,
                CANTIDAD: cantidad,
                SUBTOTAL: subtotal
            });
            res.json(detalleReserva);
        }
        else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de reserva.' });
    }
});
exports.updateDetalleReserva = updateDetalleReserva;
// Eliminar un detalle de reserva por ID
const deleteDetalleReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = yield detalle_reserva_1.DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            yield detalleReserva.destroy();
            res.json({ mensaje: 'Detalle de reserva eliminado correctamente.' });
        }
        else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de reserva.' });
    }
});
exports.deleteDetalleReserva = deleteDetalleReserva;
