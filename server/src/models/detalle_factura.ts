import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Detalle_Factura = sequelize.define(
    'Detalle_Factura',
    {
        COD_DETALLE_FACTURA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_FACTURA: { type: DataTypes.INTEGER },
        CANTIDAD: { type: DataTypes.INTEGER },
        SUBTOTAL: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
