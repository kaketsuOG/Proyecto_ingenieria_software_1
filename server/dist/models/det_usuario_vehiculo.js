"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucursal = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Sucursal = connection_1.default.define('det_usuario_vehiculo', {
    "COD_USUARIO_VEHICULO": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    "RUT_USUARIO": { type: sequelize_1.DataTypes.STRING },
    "PATENTE_COD_VEHICULO": { type: sequelize_1.DataTypes.INTEGER }
}, {
    timestamps: false,
    freezeTableName: true
});
