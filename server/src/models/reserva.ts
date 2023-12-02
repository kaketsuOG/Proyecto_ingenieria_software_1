import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';

export const Reserva = sequelize.define('Reserva', {
    "COD_RESERVA": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "FECHA_CREACION": { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    "ESTADO": { type: DataTypes.INTEGER, defaultValue: 1 }, // 1: Pendiente, 2: Entregado, 3: Cancelado
    "TOTAL": { type: DataTypes.INTEGER },
    "CELULAR_CLIENTE": { type: DataTypes.INTEGER },
},
    {
        freezeTableName: true,
        timestamps: false,
    });

Reserva.belongsTo(Cliente, { foreignKey: 'CELULAR_CLIENTE' });
