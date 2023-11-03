import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Det_usuario_vehiculo = sequelize.define('det_usuario_vehiculo', {
    "COD_USUARIO_VEHICULO": { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true},
    "RUT_USUARIO": { type: DataTypes.STRING },
    "PATENTE_COD_VEHICULO": { type: DataTypes.INTEGER }

},
    {
        timestamps: false,
        freezeTableName: true
    });
