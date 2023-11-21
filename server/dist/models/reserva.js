"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cliente_1 = require("./cliente");
const dispo_fecha_1 = require("./dispo_fecha");
const vehiculo_1 = require("./vehiculo");
const det_estado_1 = require("./det_estado");
exports.Reserva = connection_1.default.define('Reserva', {
    "COD_RESERVA": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    "CELULAR_CLIENTE": { type: sequelize_1.DataTypes.INTEGER },
    "COD_DISPONIBILIDAD": { type: sequelize_1.DataTypes.INTEGER },
    "PATENTE_VEHICULO": { type: sequelize_1.DataTypes.STRING },
    "COD_HISTORIAL": { type: sequelize_1.DataTypes.INTEGER },
    "COD_DET_ESTADO": { type: sequelize_1.DataTypes.INTEGER },
    "TOTAL": { type: sequelize_1.DataTypes.INTEGER },
    "FECHA_CREACION": { type: sequelize_1.DataTypes.DATE },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Reserva.belongsTo(cliente_1.Cliente, { foreignKey: 'CELULAR_CLIENTE' });
exports.Reserva.belongsTo(dispo_fecha_1.Disponibilidad_fecha, { foreignKey: 'COD_DISPONIBILIDAD' });
exports.Reserva.belongsTo(det_estado_1.det_estado, { foreignKey: 'COD_DET_ESTADO' });
exports.Reserva.belongsTo(vehiculo_1.Vehiculo, { foreignKey: 'PATENTE_VEHICULO' });
