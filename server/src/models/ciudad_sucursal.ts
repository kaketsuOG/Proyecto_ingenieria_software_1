import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Ciudad_sucursal = sequelize.define('Ciudad_sucursales',{
    "COD_CIUDAD_SUCURSAL": {type: DataTypes.INTEGER,primaryKey: true},
    "NOMBRE_CIUDAD": {type: DataTypes.STRING}

},
{
    timestamps: false,
    freezeTableName: true
});
