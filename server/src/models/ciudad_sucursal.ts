import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Ciudad_sucursal = sequelize.define('Ciudad_sucursal',{
    "COD_CIUDAD_SUCURSAL": {type: DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    "NOMBRE_CIUDAD": {type: DataTypes.STRING}

},
{
    timestamps: false,
    freezeTableName: true
});
