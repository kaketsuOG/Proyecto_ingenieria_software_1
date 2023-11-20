import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';
import { Disponibilidad_fecha } from './dispo_fecha';
import { Vehiculo } from './vehiculo';
import { Historial } from './historial';
import { det_estado } from './det_estado';

export const Reserva = sequelize.define('Reserva', {
    "COD_RESERVA": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    "CELULAR_CLIENTE": {
        type: DataTypes.INTEGER
    },
    "COD_DISPONIBILIDAD": {
        type: DataTypes.INTEGER
    },
    "COD_VEHICULO": {
        type: DataTypes.INTEGER
    },
    "COD_HISTORIAL": {
        type: DataTypes.INTEGER
    },
    "COD_DET_ESTADO": {
        type: DataTypes.INTEGER
    },
    "TOTAL": {
        type: DataTypes.INTEGER
    },
    "FECHA_CREACION": {
        type: DataTypes.DATE
    },
    "COD_PEDIDO": {
        type: DataTypes.DATE
    }
},
    {
        freezeTableName: true,
        timestamps: false,
    });

Reserva.belongsTo(Cliente, { foreignKey: 'CELULAR_CLIENTE' });
Reserva.belongsTo(Disponibilidad_fecha, { foreignKey: 'COD_DISPONIBILIDAD' });
Reserva.belongsTo(Vehiculo, { foreignKey: 'COD_VEHICULO' });
Reserva.belongsTo(Historial, { foreignKey: 'COD_HISTORIAL' });
Reserva.belongsTo(det_estado, { foreignKey: 'COD_DET_ESTADO' });
