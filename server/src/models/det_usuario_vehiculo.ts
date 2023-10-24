import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Sucursal = sequelize.define('det_usuario_vehiculo', {
    "COD_USUARIO_VEHICULO": { type: DataTypes.INTEGER, primaryKey: true },
    "RUT_USUARIO": { type: DataTypes.STRING },
    "PATENTE_COD_VEHICULO": { type: DataTypes.INTEGER }

},
    {
        timestamps: false,
        freezeTableName: true
    });
