"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Reserva = connection_1.default.define('Reserva', {
    "COD_RESERVA": {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "CELULAR_CLIENTE": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "COD_DISPONIBILIDAD": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "COD_VEHICULO": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "COD_HISTORIAL": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "COD_DET_ESTADO": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "TOTAL": {
        type: sequelize_1.DataTypes.INTEGER
    },
    "FECHA_CREACION": {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
