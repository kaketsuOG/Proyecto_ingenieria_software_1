
import { DATE, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { User } from './user';

export const Producto = sequelize.define('producto',{
    "COD_PRODUCTO": {type: DataTypes.INTEGER,primaryKey:true},
    "COD_INVENTARIO": {type: DataTypes.STRING,},
    "NOMBRE_PRODUCTO": {type: DataTypes.STRING},
    "PRECIO": {type: DataTypes.INTEGER}

},
{
    freezeTableName: true,
    timestamps: false,
    
    

}
)