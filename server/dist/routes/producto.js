"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const router = (0, express_1.Router)();
router.get('/list', producto_1.getProductos);
router.post('/', producto_1.newProducto);
router.get('/:cod_producto', producto_1.getProducto);
router.delete('/:cod_producto', producto_1.deleteProducto);
router.put('/:cod_producto', producto_1.updateProducto);
exports.default = router;
