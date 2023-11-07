import { Request, Response } from 'express';
import { Det_usuario_vehiculo } from '../models/det_usuario_vehiculo';
import { User } from '../models/user';
import { Vehiculo } from '../models/vehiculo';

// Crear una nueva relación entre usuario y vehículo
export const createDetUsuarioVehiculo = async (req: Request, res: Response) => {
    const { RUT_USUARIO, PATENTE_COD_VEHICULO } = req.body;

    // Verificar si el usuario y el vehículo existen
    const usuario = await User.findOne({ where: { RUT_USUARIO } });
    const vehiculo = await Vehiculo.findOne({ where: { PATENTE_COD_VEHICULO } });

    if (!usuario || !vehiculo) {
        return res.status(400).json({
            msg: 'El usuario o el vehículo no existen'
        });
    }

    try {
        const detUsuarioVehiculo = await Det_usuario_vehiculo.create({
            RUT_USUARIO,
            PATENTE_COD_VEHICULO
        });
        return res.json({
            msg: 'Relación entre usuario y vehículo creada correctamente',
            detUsuarioVehiculo
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

// Obtener todas las relaciones entre usuario y vehículo
export const getDetUsuarioVehiculos = async (req: Request, res: Response) => {
    const relaciones = await Det_usuario_vehiculo.findAll({
        include: [
            { model: User, as: 'user' },
            { model: Vehiculo, as: 'vehiculo' }
        ]
    });

    res.json(relaciones);
};

// Obtener una relación entre usuario y vehículo por su código
export const getDetUsuarioVehiculo = async (req: Request, res: Response) => {
    const { COD_USUARIO_VEHICULO } = req.params;
    const relacion = await Det_usuario_vehiculo.findOne({
        where: { COD_USUARIO_VEHICULO },
        include: [
            { model: User, as: 'user' },
            { model: Vehiculo, as: 'vehiculo' }
        ]
    });

    if (!relacion) {
        return res.status(400).json({
            msg: "La relación entre usuario y vehículo con el código indicado no existe"
        });
    }

    try {
        return res.json(relacion);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

// Eliminar una relación entre usuario y vehículo por su código
export const deleteDetUsuarioVehiculo = async (req: Request, res: Response) => {
    const { COD_USUARIO_VEHICULO } = req.params;
    const relacion = await Det_usuario_vehiculo.findOne({
        where: { COD_USUARIO_VEHICULO },
        include: [
            { model: User, as: 'user' },
            { model: Vehiculo, as: 'vehiculo' }
        ]
    });

    if (!relacion) {
        return res.status(400).json({
            msg: "La relación entre usuario y vehículo con el código " + COD_USUARIO_VEHICULO + " no existe"
        });
    }

    try {
        await Det_usuario_vehiculo.destroy({ where: { COD_USUARIO_VEHICULO } });
        res.json({
            msg: "Se ha eliminado la relación entre usuario y vehículo con código: " + COD_USUARIO_VEHICULO
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar la relación entre usuario y vehículo con código: " + COD_USUARIO_VEHICULO,
            error
        });
    }
};