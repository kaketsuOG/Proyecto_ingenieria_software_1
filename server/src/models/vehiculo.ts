import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Det_usuario_vehiculo } from './det_usuario_vehiculo';

export const Vehiculo = sequelize.define('Vehiculo', {
    "PATENTE_COD_VEHICULO": { type: DataTypes.STRING, primaryKey: true },
    "MARCA": { type: DataTypes.STRING },
    "MODELO": { type: DataTypes.INTEGER },
    "COLOR": { type: DataTypes.STRING },
    "ANO": { type: DataTypes.INTEGER }

},
    {
        timestamps: false,
        freezeTableName: true
    });
Vehiculo.hasMany(Det_usuario_vehiculo, { foreignKey: 'PATENTE_COD_VEHICULO' });
