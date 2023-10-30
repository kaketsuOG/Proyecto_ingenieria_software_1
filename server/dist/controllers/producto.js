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
exports.deleteProducto = exports.getProducto = exports.updateProducto = exports.newProducto = exports.getProductos = void 0;
const producto_1 = require("../models/producto");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProductos = yield producto_1.Producto.findAll({ attributes: ['COD_PRODUCTO', 'NOMBRE_PRODUCTO', 'PRECIO', 'COD_INVENTARIO'] });
    res.json(listProductos);
});
exports.getProductos = getProductos;
const newProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_producto, precio, cod_inventario } = req.body;
    try {
        yield producto_1.Producto.create({
            "NOMBRE_PRODUCTO": nombre_producto,
            "PRECIO": precio,
            "COD_INVENTARIO": cod_inventario
        });
        return res.json({
            msg: 'Producto creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el producto',
            error
        });
    }
});
exports.newProducto = newProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id del producto no existe"
        });
    }
    try {
        const { nombre_producto, precio, cod_inventario } = req.body;
        yield producto_1.Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO: precio,
            COD_INVENTARIO: cod_inventario
        }, { where: { COD_PRODUCTO: cod_producto } });
        return res.json({
            msg: 'Producto ' + cod_producto + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        });
    }
});
exports.updateProducto = updateProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        });
    }
    try {
        return res.json(idProducto);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el producto: ' + cod_producto,
            error
        });
    }
});
exports.getProducto = getProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_producto } = req.params;
    const idProducto = yield producto_1.Producto.findOne({ where: { COD_PRODUCTO: cod_producto } });
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        });
    }
    try {
        yield producto_1.Producto.destroy({ where: { COD_PRODUCTO: cod_producto } });
        return res.json({
            msg: 'Producto de id ' + cod_producto + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el producto: ' + cod_producto,
            error
        });
    }
});
exports.deleteProducto = deleteProducto;
