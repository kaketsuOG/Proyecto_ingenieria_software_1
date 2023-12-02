import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';
import { Producto } from './producto';

export const DetalleReserva = sequelize.define('DetalleReserva', {
    "COD_DETALLE_RESERVA": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "COD_RESERVA": { type: DataTypes.INTEGER },
    "COD_PRODUCTO": { type: DataTypes.INTEGER },
    "CANTIDAD": { type: DataTypes.INTEGER },
    "PRECIO": { type: DataTypes.INTEGER }, // Agregado el campo 'PRECIO'
    "SUBTOTAL": { type: DataTypes.INTEGER }, // Agregado el campo 'SUBTOTAL'
},
    {
        timestamps: false,
        freezeTableName: true
    });

DetalleReserva.belongsTo(Reserva, { foreignKey: 'COD_RESERVA' });
DetalleReserva.belongsTo(Producto, { foreignKey: 'COD_PRODUCTO' });