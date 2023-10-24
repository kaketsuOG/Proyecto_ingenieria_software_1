import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Detalle_marca_vehiculo = sequelize.define('Detalle_marca_vehiculos',{
    "COD_MARCA_VEHICULO":{
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    "NOMBRE_MARCA_VEHICULO":{
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false,
});