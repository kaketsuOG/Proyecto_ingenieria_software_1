import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';
import { Producto } from './producto';

export const Detalle_reserva_producto = sequelize.define('Detalle_reserva_producto', {
    "COD_PEDIDO": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_PRODUCTO": { type: DataTypes.INTEGER },
    "COD_RESERVA": { type: DataTypes.INTEGER },
    "CANTIDAD": { type: DataTypes.INTEGER }


},
    {
        timestamps: false,
        freezeTableName: true
    });

Detalle_reserva_producto.belongsTo(Reserva, { foreignKey: 'COD_RESERVA' });
Detalle_reserva_producto.belongsTo(Producto, { foreignKey: 'COD_PRODUCTO' });