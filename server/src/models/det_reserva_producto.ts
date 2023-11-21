import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';
import { Producto } from './producto';

export const Pedido = sequelize.define('Pedido', {
    "COD_PEDIDO": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_PRODUCTO": { type: DataTypes.INTEGER },
    "COD_RESERVA": { type: DataTypes.INTEGER },
    "CANTIDAD": { type: DataTypes.INTEGER }


},
    {
        timestamps: false,
        freezeTableName: true
    });

Pedido.belongsTo(Reserva, {foreignKey: 'COD_RESERVA'});
Pedido.belongsTo(Producto, {foreignKey: 'COD_PRODUCTO'});