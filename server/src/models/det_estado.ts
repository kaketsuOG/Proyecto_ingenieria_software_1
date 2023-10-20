import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const det_estado = sequelize.define('det_estados',{
    "COD_DET_ESTADO": {type: DataTypes.INTEGER,primaryKey: true},
    "NOMBRE_ESTADO": {type: DataTypes.STRING}
        

},
{
    timestamps: false,
    freezeTableName: true
});
