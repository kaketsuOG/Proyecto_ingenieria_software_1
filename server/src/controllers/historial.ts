import { Request, Response } from 'express';
import { Historial } from '../models/historial';

// Crear un nuevo historial
export const createHistorial = async (req: Request, res: Response) => {
    const { FECHA_HISTORIAL } = req.body;

    try {
        const historial = await Historial.create({
            FECHA_HISTORIAL
        });
        return res.json({
            msg: 'Historial creado correctamente',
            historial
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

// Obtener todos los historiales
export const getHistoriales = async (req: Request, res: Response) => {
    const historiales = await Historial.findAll({
        attributes: ['COD_HISTORIAL', 'FECHA_HISTORIAL']
    });

    res.json(historiales);
};

// Obtener un historial por su código
export const getHistorial = async (req: Request, res: Response) => {
    const { COD_HISTORIAL } = req.params;
    const historial = await Historial.findOne({ where: { COD_HISTORIAL } });

    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código indicado no existe"
        });
    }

    try {
        return res.json(historial);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

// Eliminar un historial por su código
export const deleteHistorial = async (req: Request, res: Response) => {
    const { COD_HISTORIAL } = req.params;
    const historial = await Historial.findOne({ where: { COD_HISTORIAL } });

    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código " + COD_HISTORIAL + " no existe"
        });
    }

    try {
        await Historial.destroy({ where: { COD_HISTORIAL } });
        res.json({
            msg: "Se ha eliminado el historial con código: " + COD_HISTORIAL
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el historial con código: " + COD_HISTORIAL,
            error
        });
    }
};

// Actualizar un historial por su código
export const updateHistorial = async (req: Request, res: Response) => {
    const { COD_HISTORIAL } = req.params;
    const { FECHA_HISTORIAL } = req.body;
    const historial = await Historial.findOne({ where: { COD_HISTORIAL } });

    if (!historial) {
        return res.status(400).json({
            msg: "El historial con el código " + COD_HISTORIAL + " no existe"
        });
    }

    try {
        await Historial.update({ FECHA_HISTORIAL }, { where: { COD_HISTORIAL } });
        res.json({
            msg: "Se ha actualizado el historial con código: " + COD_HISTORIAL
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el historial con código: " + COD_HISTORIAL,
            error
        });
    }
};