import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Sucursal = sequelize.define('Vehiculo', {
    "PATENTE_COD_VEHICULO": { type: DataTypes.INTEGER, primaryKey: true },
    "MARCA": { type: DataTypes.STRING },
    "MODELO": { type: DataTypes.INTEGER },
    "COLOR": { type: DataTypes.STRING },
    "ANO": { type: DataTypes.INTEGER }

},
    {
        timestamps: false,
        freezeTableName: true
    });