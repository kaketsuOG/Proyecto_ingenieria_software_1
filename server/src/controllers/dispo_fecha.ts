
import { Request, Response } from 'express';
import { Disponibilidad_fecha } from '../models/dispo_fecha';

export const getDisponibilidad_fechas = async (req: Request, res: Response) => {
    try{  
        const listDisponibilidad_fechas = await Disponibilidad_fecha.findAll({ attributes: ['COD_DISPONIBILIDAD', 'FECHA_ENTREGA', 'COD_HORARIO_ENTREGA'] });
        res.json(listDisponibilidad_fechas);
} catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las disponibilidades de fecha.' });
    }
};


// Crear un registro de disponibilidad de fecha
export const newDispoFecha = async (req: Request, res: Response) => {
    const { COD_DISPONIBILIDAD, FECHA_ENTREGA, COD_HORARIO_ENTREGA } = req.body;

    try {
        const dispoFecha = await Disponibilidad_fecha.create({
            COD_DISPONIBILIDAD,
            FECHA_ENTREGA,
            COD_HORARIO_ENTREGA,
        });

        return res.status(201).json({
            msg: 'Disponibilidad de fecha creada correctamente',
            dispoFecha,
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al crear la disponibilidad de fecha',
            error,
        });
    }
};

// Obtener información de una disponibilidad de fecha por su código
export const getDispoFecha = async (req: Request, res: Response) => {
    const { codigo } = req.params;

    const dispoFecha = await Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });

    if (!dispoFecha){
    return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        return res.json(dispoFecha);
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar la disponibilidad de fecha',
            error,
        });
    }
};

// Actualizar información de una disponibilidad de fecha por su código
export const updateDispoFecha = async (req: Request, res: Response) => {
    const { codigo } = req.params;
    const updateData = req.body;

    const dispoFecha = await Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });

    if (!dispoFecha) {
        return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        // Actualizar los datos
        await dispoFecha.update(updateData);

        return res.json({
            msg: 'Disponibilidad de fecha actualizada correctamente',
            dispoFecha,
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al actualizar la disponibilidad de fecha',
            error,
        });
    }
};

// Eliminar una disponibilidad de fecha por su código
export const deleteDispoFecha = async (req: Request, res: Response) => {
    const { codigo } = req.params;

    const dispoFecha = await Disponibilidad_fecha.findOne({
        where: {
            COD_DISPONIBILIDAD: codigo
        }
    });

    if (!dispoFecha) {
        return res.status(404).json({
            msg: 'Disponibilidad de fecha no encontrada',
        });
    }
    try {
        await dispoFecha.destroy();

        return res.json({
            msg: 'Disponibilidad de fecha eliminada correctamente',
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al eliminar la disponibilidad de fecha',
            error,
        });
    }
};
