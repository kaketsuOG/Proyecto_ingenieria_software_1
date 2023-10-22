"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disponibilidad_fecha = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Disponibilidad_fecha = connection_1.default.define('Disponibilidad_fechas', {
    "COD_DISPONIBILIDAD": {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    "FECHA_ENTREGA": {
        type: sequelize_1.DataTypes.DATE
    },
    "COD_HORARIO_ENTREGA": {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
