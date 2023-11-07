import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Sucursal = sequelize.define('Sucursal',{
    "COD_SUCURSAL": {type: DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    "NOMBRE_SUCURSAL": {type: DataTypes.STRING},
    "COD_CIUDAD_SUCURSAL": {type: DataTypes.INTEGER},
    "CALLE_SUCURSAL": {type: DataTypes.STRING},
    "NRO_DIRECCION_SUCURSAL": {type: DataTypes.INTEGER}
        

},
{
    timestamps: false,
    freezeTableName: true
});
