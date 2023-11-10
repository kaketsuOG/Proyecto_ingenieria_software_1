
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

<<<<<<< HEAD
export const Producto = sequelize.define('producto',{
    "COD_PRODUCTO": {type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    "CANTIDAD_TOTAL": {type: DataTypes.INTEGER},
    "CANTIDAD_DISPONIBLE": {type: DataTypes.INTEGER},
    "NOMBRE_PRODUCTO": {type: DataTypes.STRING},
    "PRECIO": {type: DataTypes.INTEGER}
=======
export const Producto = sequelize.define('producto', {
    "COD_PRODUCTO": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "NOMBRE_PRODUCTO": { type: DataTypes.STRING },
    "PRECIO": { type: DataTypes.INTEGER },
    "CANTIDAD_DISPONIBLE": { type: DataTypes.INTEGER },
    "CANTIDAD_TOTAL": { type: DataTypes.INTEGER }

>>>>>>> 1115f696598a306e5b3a3148e6e9a2e300fbef74
},
    {
        freezeTableName: true,
        timestamps: false,

<<<<<<< HEAD
}
=======


    }
>>>>>>> 1115f696598a306e5b3a3148e6e9a2e300fbef74
);