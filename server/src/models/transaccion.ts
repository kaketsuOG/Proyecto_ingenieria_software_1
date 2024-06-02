import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const transaccion = sequelize.define(
    'transaccion',
    {
        COD_TRANSACCION: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_PAGO: { type: DataTypes.INTEGER },
        FECHA_PAGO: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        ESTADO_TRANSACCION: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);