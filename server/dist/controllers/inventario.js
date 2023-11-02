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
exports.getInventarios = exports.getInventario = exports.quitarProductos = exports.agregarProductos = exports.updateInventario = exports.newInventario = void 0;
const inventario_1 = require("../models/inventario");
const producto_1 = require("../models/producto");
const newInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_sucursal, cantidad_total } = req.body;
    try {
        yield inventario_1.Inventario.create({
            "COD_SUCURSAL": cod_sucursal,
            "CANTIDAD_TOTAL": cantidad_total,
            "CANTIDAD_DISPONIBLE": cantidad_total
        });
        return res.json({
            msg: 'Inventario creado'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el inventario',
            error
        });
    }
});
exports.newInventario = newInventario;
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const idInventario = yield producto_1.Producto.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id del inventario no existe"
        });
    }
    try {
        const { cantidad_total } = req.body;
        yield inventario_1.Inventario.update({
            CANTIDAD_DISPONIBLE: cantidad_total
        }, { where: { COD_INVENTARIO: cod_inventario } });
        return res.json({
            msg: 'Se ha actualizado el maximo del inventario a ' + cantidad_total
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el inventario: ' + cod_inventario,
            error
        });
    }
});
exports.updateInventario = updateInventario;
const agregarProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const { cod_producto, cantidad } = req.body;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        });
    }
    const idInventario = yield inventario_1.Inventario.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El inventario no existe"
        });
    }
    try {
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt + 1; i++) {
            const cantidadDisponible = yield inventario_1.Inventario.findOne({ attributes: ['CANTIDAD_DISPONIBLE'], where: { COD_INVENTARIO: cod_inventario } });
            const cantidadDisponible2 = (cantidadDisponible === null || cantidadDisponible === void 0 ? void 0 : cantidadDisponible.dataValues.CANTIDAD_DISPONIBLE) + 1;
            yield inventario_1.Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible2
            }, { where: { COD_INVENTARIO: cod_inventario } });
        }
        return res.json({
            msg: "Se han añadido " + cantidad + " de productos"
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al añadir los productos',
            error
        });
    }
});
exports.agregarProductos = agregarProductos;
const quitarProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const { cod_producto, cantidad } = req.body;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        });
    }
    const idInventario = yield inventario_1.Inventario.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El inventario no existe"
        });
    }
    try {
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt + 1; i++) {
            const cantidadDisponible = yield inventario_1.Inventario.findOne({ attributes: ['CANTIDAD_DISPONIBLE'], where: { COD_INVENTARIO: cod_inventario } });
            const cantidadDisponible2 = (cantidadDisponible === null || cantidadDisponible === void 0 ? void 0 : cantidadDisponible.dataValues.CANTIDAD_DISPONIBLE) - 1;
            yield inventario_1.Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible2
            }, { where: { COD_INVENTARIO: cod_inventario } });
        }
        return res.json({
            msg: "Se han quitado " + cantidad + " de productos"
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al quitar los productos',
            error
        });
    }
});
exports.quitarProductos = quitarProductos;
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_inventario } = req.params;
    const idInventario = yield inventario_1.Inventario.findOne({ where: { COD_INVENTARIO: cod_inventario } });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id: " + cod_inventario + " de inventario no existe"
        });
    }
    try {
        return res.json(idInventario);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el inventarioo: ' + cod_inventario,
            error
        });
    }
});
exports.getInventario = getInventario;
const getInventarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listInventarios = yield producto_1.Producto.findAll();
    res.json(listInventarios);
});
exports.getInventarios = getInventarios;
