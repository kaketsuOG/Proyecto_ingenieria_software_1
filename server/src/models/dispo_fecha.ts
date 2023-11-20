import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Detalle_horario_entrega } from './det_horario_entrega';


export const Disponibilidad_fecha = sequelize.define('Disponibilidad_fecha',{
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

Disponibilidad_fecha.belongsTo(Detalle_horario_entrega, { foreignKey: 'COD_HORARIO_ENTREGA' });
