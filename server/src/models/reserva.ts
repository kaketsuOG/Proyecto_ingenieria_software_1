import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Reserva = sequelize.define('Reservas',{
    "COD_RESERVA": {
        type: DataTypes.INTEGER,
        primaryKey:true,
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
    }
},
{
    freezeTableName: true,
    timestamps: false,
});