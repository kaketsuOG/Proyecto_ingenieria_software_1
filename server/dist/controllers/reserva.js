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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVentasPorMes = exports.getMasVendido = exports.deleteReserva = exports.updateReserva = exports.getReservas = exports.getReserva = exports.newReserva = void 0;
const reserva_1 = require("../models/reserva");
const detalle_reserva_1 = require("../models/detalle_reserva");
const producto_1 = require("../models/producto");
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("sequelize");
const handleErrorResponse = (res, message, error) => {
    res.status(400).json({
        msg: message,
        error,
    });
};
const newReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE, CANTIDAD, COD_PRODUCTO } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    try {
        const reserva = yield reserva_1.Reserva.create({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO_CLIENTE,
            DIRECCION_CLIENTE,
            CIUDAD_CLIENTE,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente',
            TOTAL: 0,
        });
        const pkReserva = reserva.dataValues.COD_RESERVA;
        for (const [index, producto] of COD_PRODUCTO.entries()) {
            const cantidad = CANTIDAD[index];
            if (cantidad > 0 || cantidad) {
                const idProducto = yield producto_1.Producto.findOne({ attributes: ['PRECIO_PRODUCTO', 'CANTIDAD_DISPONIBLE', 'CANTIDAD_TOTAL'], where: { COD_PRODUCTO: producto } });
                const precioProducto = idProducto === null || idProducto === void 0 ? void 0 : idProducto.dataValues.PRECIO_PRODUCTO;
                const subTotal = precioProducto * cantidad;
                const idReserva = yield reserva_1.Reserva.findOne({ attributes: ['TOTAL'], where: { COD_RESERVA: pkReserva } });
                const total = idReserva === null || idReserva === void 0 ? void 0 : idReserva.dataValues.TOTAL;
                if (!idProducto) {
                    return res.status(400).json({
                        msg: "El producto ingresado no existe"
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
                        COD_RESERVA: pkReserva,
                        COD_PRODUCTO: producto,
                        CANTIDAD: cantidad,
                        SUBTOTAL: subTotal
                    });
                    yield reserva_1.Reserva.update({
                        TOTAL: total + subTotal
                    }, { where: { COD_RESERVA: pkReserva }
                    });
                    yield producto_1.Producto.update({
                        CANTIDAD_DISPONIBLE: cantidadDisponible
                    }, { where: { COD_PRODUCTO: producto }
                    });
                }
                catch (innerError) {
                    res.status(400).json({
                        msg: "Ha ocurrido un error al hacer el pedido",
                        innerError
                    });
                }
            }
        }
        res.json({
            msg: 'Pedido realizado correctamente'
        });
    }
    catch (outterError) {
        res.status(400).json({
            msg: "Ha ocurrido un error al hacer el pedido",
            outterError
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
        handleErrorResponse(res, 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva, error);
    }
});
exports.getReserva = getReserva;
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listReservas = yield reserva_1.Reserva.findAll();
        res.json(listReservas);
    }
    catch (error) {
        handleErrorResponse(res, 'Ha ocurrido un error al obtener las reservas', error);
    }
});
exports.getReservas = getReservas;
const updateReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE, ESTADO } = req.body;
    try {
        const reserva = yield reserva_1.Reserva.findByPk(cod_reserva);
        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }
        yield reserva.update({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO_CLIENTE,
            DIRECCION_CLIENTE,
            CIUDAD_CLIENTE,
            ESTADO
        });
        res.json({
            msg: 'Reserva actualizada correctamente',
            reserva,
        });
    }
    catch (error) {
        handleErrorResponse(res, 'Ha ocurrido un error al actualizar la reserva ' + cod_reserva, error);
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
        handleErrorResponse(res, 'Ha ocurrido un error al eliminar la reserva ' + cod_reserva, error);
    }
});
exports.deleteReserva = deleteReserva;
const getMasVendido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha_inicio, fecha_final } = req.body;
    const productos = yield detalle_reserva_1.DetalleReserva.findAll({ attributes: [[sequelize_1.default.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD'],
        include: [
            {
                model: reserva_1.Reserva,
                where: {
                    FECHA_CREACION: {
                        [sequelize_2.Op.between]: [fecha_inicio, fecha_final],
                    },
                },
            },
            {
                model: producto_1.Producto,
                attributes: [],
            },
        ],
    });
    if (!productos || productos.length == 0) {
        res.status(400).json({
            msg: 'No se han encontrado reservas en ese periodo de tiempo'
        });
    }
    const productosPorNombre = new Map();
    for (const producto of productos) {
        const nombreProducto = producto.getDataValue('NOMBRE_PRODUCTO');
        const cantidad = producto.getDataValue('CANTIDAD');
        if (productosPorNombre.has(nombreProducto)) {
            productosPorNombre.get(nombreProducto).push(cantidad);
        }
        else {
            productosPorNombre.set(nombreProducto, [cantidad]);
        }
    }
    try {
        if (productosPorNombre.size > 0) {
            let nombreProductoMayorCantidad = '';
            let cantidadMayor = 0;
            for (const [nombreProducto, cantidades] of productosPorNombre) {
                const totalCantidad = cantidades.reduce((acc, curr) => acc + curr, 0);
                if (totalCantidad > cantidadMayor) {
                    nombreProductoMayorCantidad = nombreProducto;
                    cantidadMayor = totalCantidad;
                }
            }
            const idProducto = yield producto_1.Producto.findOne({ where: { NOMBRE_PRODUCTO: nombreProductoMayorCantidad } });
            res.json({
                idProducto,
                cantidadMayor
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.getMasVendido = getMasVendido;
const getVentasPorMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.getFullYear();
    const reservas = yield reserva_1.Reserva.findAll({
        attributes: [
            'TOTAL',
            'FECHA_CREACION',
        ],
        where: {
            FECHA_CREACION: {
                [sequelize_2.Op.gte]: [fechaFormateada],
                [sequelize_2.Op.lte]: [fechaFormateada + 1]
            }
        }
    });
    if (!reservas || reservas.length == 0) {
        res.json({
            msg: 'No hay reservas en esye año'
        });
    }
    try {
        const reservasPorMes = new Map();
        for (const reserva of reservas) {
            const fechaReserva = reserva.getDataValue('FECHA_CREACION');
            const mesReserva = parseInt(fechaReserva.slice(5, 7), 10);
            const total = reserva.getDataValue('TOTAL');
            if (reservasPorMes.has(mesReserva)) {
                const infoMes = reservasPorMes.get(mesReserva);
                infoMes.cantidad++;
                infoMes.total += total;
            }
            else {
                reservasPorMes.set(mesReserva, { cantidad: 1, total: total });
            }
        }
        const meses = Array.from({ length: 12 }, (_, index) => index + 1);
        const ventasPorMesArray = meses.map(mes => {
            var _a, _b;
            return ({
                mes,
                cantidadVentas: ((_a = reservasPorMes.get(mes)) === null || _a === void 0 ? void 0 : _a.cantidad) || 0,
                totalDinero: ((_b = reservasPorMes.get(mes)) === null || _b === void 0 ? void 0 : _b.total) || 0,
            });
        });
        res.json(ventasPorMesArray);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        });
    }
});
exports.getVentasPorMes = getVentasPorMes;
