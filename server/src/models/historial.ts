import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Historial = sequelize.define('Historial', {
    "COD_HISTORIAL": { type: DataTypes.INTEGER, primaryKey: true },
    "FECHA_HISTORIAL": { type: DataTypes.DATE }

},
    {
        timestamps: false,
        freezeTableName: true
    });
