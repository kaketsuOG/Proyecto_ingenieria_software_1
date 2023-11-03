import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Detalle_horario_entrega = sequelize.define('DETALLE_HORARIO_ENTREGAS',{
    "COD_HORARIO_ENTREGA":{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    "HORA_ENTREGA":{
        type: DataTypes.TIME
    }
},
{
    freezeTableName: true,
    timestamps: false,
});