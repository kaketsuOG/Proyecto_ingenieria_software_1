import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { User } from './user';
import { Vehiculo } from './vehiculo';

export const Det_usuario_vehiculo = sequelize.define('det_usuario_vehiculo', {
    "COD_USUARIO_VEHICULO": { type: DataTypes.INTEGER, primaryKey: true },
    "RUT_USUARIO": { type: DataTypes.STRING },
    "PATENTE_COD_VEHICULO": { type: DataTypes.STRING }
},
    {
        timestamps: false,
        freezeTableName: true
    });

Det_usuario_vehiculo.belongsTo(User, { foreignKey: 'RUT_USUARIO', as: 'user' });
Det_usuario_vehiculo.belongsTo(Vehiculo, { foreignKey: 'PATENTE_COD_VEHICULO', as: 'vehiculo' });
