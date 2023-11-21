import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Reserva } from './reserva';

export const det_estado = sequelize.define('det_estado',{
    "COD_DET_ESTADO": {type: DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    "NOMBRE_ESTADO": {type: DataTypes.STRING}
        

},
{
    timestamps: false,
    freezeTableName: true
});
