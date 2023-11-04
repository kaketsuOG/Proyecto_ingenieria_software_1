
import {DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Inventario } from './inventario';

export const Producto = sequelize.define('producto',{
    "COD_PRODUCTO": {type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    "COD_INVENTARIO": {type: DataTypes.INTEGER,},
    "NOMBRE_PRODUCTO": {type: DataTypes.STRING},
    "PRECIO": {type: DataTypes.INTEGER}

},
{
    freezeTableName: true,
    timestamps: false,
    
    

}
);
Producto.belongsTo(Inventario,{ foreignKey: 'COD_INVENTARIO'});