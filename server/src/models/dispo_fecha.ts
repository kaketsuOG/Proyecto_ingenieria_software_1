import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Disponibilidad_fecha = sequelize.define('Disponibilidad_fechas',{
    "COD_DISPONIBILIDAD":{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    "FECHA_ENTREGA":{
        type: DataTypes.DATE
    },
    "COD_HORARIO_ENTREGA":{
        type: DataTypes.INTEGER
    },
},
{
    freezeTableName: true,
    timestamps: false,
});