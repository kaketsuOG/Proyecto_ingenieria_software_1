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
exports.getMasVendido = exports.deleteReserva = exports.updateReserva = exports.getReservas = exports.getReserva = exports.newReserva = void 0;
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
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE, } = req.body;
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
        return res.json({
            msg: 'Reserva creada correctamente',
            reserva,
        });
    }
    catch (error) {
        handleErrorResponse(res, 'Ocurrió un error al crear la reserva', error);
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
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE } = req.body;
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
    console.log(productosPorNombre);
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
            console.log();
            const idProducto = yield producto_1.Producto.findOne({ where: { NOMBRE_PRODUCTO: nombreProductoMayorCantidad } });
            res.json({
                idProducto,
                cantidadMayor
            });
        }
        else {
            res.status(400).json({
                msg: 'No se han encontrado productos.'
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
