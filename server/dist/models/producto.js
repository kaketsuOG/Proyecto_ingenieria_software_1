"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const inventario_1 = require("./inventario");
exports.Producto = connection_1.default.define('producto', {
    "COD_PRODUCTO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_INVENTARIO": { type: sequelize_1.DataTypes.INTEGER, },
    "NOMBRE_PRODUCTO": { type: sequelize_1.DataTypes.STRING },
    "PRECIO": { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Producto.belongsTo(inventario_1.Inventario, { foreignKey: 'COD_INVENTARIO' });
