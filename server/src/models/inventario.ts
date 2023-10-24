import { DATE, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { User } from './user';

export const Inventario = sequelize.define('inventario',{
    "COD_INVENTARIO": {type: DataTypes.INTEGER,primaryKey:true},
    "COD_SUCURSAL": {type: DataTypes.INTEGER},
    "CANTIDAD_TOTAL": {type: DataTypes.INTEGER},
    "CANTIDAD_DISPONIBLE": {type: DataTypes.INTEGER}

},
{
    freezeTableName: true,
    timestamps: false,

}
)
