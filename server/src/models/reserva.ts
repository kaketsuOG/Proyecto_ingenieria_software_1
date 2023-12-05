import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Reserva = sequelize.define(
    'Reserva',
    {
        COD_RESERVA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        FECHA_CREACION: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 }, // 1: Pendiente, 2: Entregado, 3: Cancelado
        TOTAL: { type: DataTypes.INTEGER },
        CELULAR_CLIENTE: { type: DataTypes.INTEGER },
        NOMBRE_CLIENTE: { type: DataTypes.STRING },
        APELLIDO1_CLIENTE: { type: DataTypes.STRING },
        APELLIDO2_CLIENTE: { type: DataTypes.STRING },
        DIRECCION_CLIENTE: { type: DataTypes.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);