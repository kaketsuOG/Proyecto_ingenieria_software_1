import { Request, Response } from 'express';
import { Detalle_horario_entrega } from '../models/det_horario_entrega';

export const getDetalle_horario_entregas = async (req: Request, res: Response) => {
    try {
    const listDetalle_horario_entregas = await Detalle_horario_entrega.findAll({ attributes: ['COD_HORARIO_ENTREGA', 'HORA_ENTREGA'] });
    res.json(listDetalle_horario_entregas);
}catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error  al obtener los detalles de horario de entrega.' });
    }
};



// Crear un registro de horario de entrega
export const newHorarioEntrega = async (req: Request, res: Response) => {
    const { COD_HORARIO_ENTREGA, HORA_ENTREGA } = req.body;

    try {
        const horarioEntrega = await Detalle_horario_entrega.create({
            COD_HORARIO_ENTREGA,
            HORA_ENTREGA,
        });

        return res.status(201).json({
            msg: 'Horario de entrega creado correctamente',
            horarioEntrega,
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al crear el horario de entrega',
            error: error.message,
        });
    }
};

// Obtener información de un horario de entrega por su código
export const getHorarioEntrega = async (req: Request, res: Response) => {
    const { codigo } = req.params;

    const horarioEntrega = await Detalle_horario_entrega.findOne({
        where: {
            COD_HORARIO_ENTREGA: codigo
        }
    });

    if (!horarioEntrega) {
        return res.status(404).json({
            msg: 'Horario de entrega no encontrado',
        });
    }
    try {
        return res.json(horarioEntrega);
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al buscar el horario de entrega',
            error: error.message,
        });
    }
};

// Actualizar información de un horario de entrega por su código
export const updateHorarioEntrega = async (req: Request, res: Response) => {
    const { codigo } = req.params;
    const updateData = req.body;


    const horarioEntrega = await Detalle_horario_entrega.findOne({
        where: {
            COD_HORARIO_ENTREGA: codigo
        }
    });

    if (!horarioEntrega) {
        return res.status(404).json({
            msg: 'Horario de entrega no encontrado',
        });
    }
    try {
        // Actualizar los datos
        await horarioEntrega.update(updateData);

        return res.json({
            msg: 'Horario de entrega actualizado correctamente',
            horarioEntrega,
        });
    } catch (error) {
        return res.status(404).json({
            msg: 'Ocurrió un error al actualizar el horario de entrega',
            error,
        });
    }
};

// Eliminar un horario de entrega por su código
export const deleteHorarioEntrega = async (req: Request, res: Response) => {
    const { codigo } = req.params;

    try {
        const horarioEntrega = await Detalle_horario_entrega.findOne({
            where: {
                COD_HORARIO_ENTREGA: codigo
            }
        });

        if (!horarioEntrega) {
            return res.status(404).json({
                msg: 'Horario de entrega no encontrado',
            });
        }

        await horarioEntrega.destroy();

        return res.json({
            msg: 'Horario de entrega eliminado correctamente',
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Ocurrió un error al eliminar el horario de entrega',
            error: error.message,
        });
    }
};
