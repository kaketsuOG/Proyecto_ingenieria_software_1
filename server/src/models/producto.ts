
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Producto = sequelize.define('producto',{
    "COD_PRODUCTO": {type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    "CANTIDAD_TOTAL": {type: DataTypes.INTEGER},
    "CANTIDAD_DISPONIBLE": {type: DataTypes.INTEGER},
    "NOMBRE_PRODUCTO": {type: DataTypes.STRING},
    "PRECIO_PRODUCTO": {type: DataTypes.INTEGER}
},
    {
        freezeTableName: true,
        timestamps: false,

}
);