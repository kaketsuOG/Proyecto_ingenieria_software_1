import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Carrito = sequelize.define(
    'Carrito',
    {
        COD_CARRITO: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        COD_PRODUCTO: { type: DataTypes.INTEGER },
        COSTO_TOTAL: { type: DataTypes.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
