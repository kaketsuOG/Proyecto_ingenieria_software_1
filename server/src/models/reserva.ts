import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';
import { Disponibilidad_fecha } from './dispo_fecha';
import { Vehiculo } from './vehiculo';
import { det_estado } from './det_estado';
import { Pedido } from './pedido';

export const Reserva = sequelize.define('Reserva', {
    "COD_RESERVA": { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    "CELULAR_CLIENTE": { type: DataTypes.INTEGER },
    "COD_DISPONIBILIDAD": { type: DataTypes.INTEGER },
    "PATENTE_COD_VEHICULO": { type: DataTypes.STRING },
    "COD_HISTORIAL": { type: DataTypes.INTEGER },
    "COD_DET_ESTADO": { type: DataTypes.INTEGER },
    "TOTAL": { type: DataTypes.INTEGER },
    "FECHA_CREACION": { type: DataTypes.DATE },

},
    {
        freezeTableName: true,
        timestamps: false,
    });

Reserva.belongsTo(Cliente, { foreignKey: 'CELULAR_CLIENTE' });
Reserva.belongsTo(Disponibilidad_fecha, { foreignKey: 'COD_DISPONIBILIDAD' });
Reserva.belongsTo(det_estado, { foreignKey: 'COD_DET_ESTADO' });
Reserva.belongsTo(Vehiculo, { foreignKey: 'PATENTE_COD_VEHICULO' });