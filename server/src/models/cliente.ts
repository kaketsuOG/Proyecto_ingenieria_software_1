import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';

export const Cliente = sequelize.define('Cliente', {
    "CELULAR_CLIENTE": { type: DataTypes.INTEGER, primaryKey: true },
    "NOMBRE_CLIENTE": { type: DataTypes.STRING },
    "APELLIDO1_CLIENTE": { type: DataTypes.STRING },
    "APELLIDO2_CLIENTE": { type: DataTypes.STRING },
    "DIRECCION_CLIENTE": { type: DataTypes.STRING }

},
    {
        timestamps: false,
        freezeTableName: true
    });
