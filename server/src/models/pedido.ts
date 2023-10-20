import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Pedido = sequelize.define('Pedidos',{
    "COD_PEDIDO": {type: DataTypes.INTEGER,primaryKey: true},
    "COD_PRODUCTO": {type: DataTypes.INTEGER},
    "COD_RESERVA": {type: DataTypes.INTEGER}
        

},
{
    timestamps: false,
    freezeTableName: true
});
