import { Request, Response } from "express";
import { Reserva } from "../models/reserva";
import { DetalleReserva } from '../models/detalle_reserva';

export const newReserva = async (req: Request, res: Response) => {
    const { CELULAR_CLIENTE } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    try {
        const reserva = await Reserva.create({
            CELULAR_CLIENTE,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente', // Actualizado según el nuevo modelo
            TOTAL: 0,
        });

        return res.json({
            msg: 'Reserva creada correctamente',
            reserva,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
};

export const getReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }

        res.json(reserva);
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva,
            error,
        });
    }
};

export const getReservas = async (req: Request, res: Response) => {
    try {
        const listReservas = await Reserva.findAll();
        res.json(listReservas);
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener las reservas',
            error,
        });
    }
};

export const updateReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE } = req.body;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }

        await reserva.update({
            CELULAR_CLIENTE,
        });

        res.json({
            msg: 'Reserva actualizada correctamente',
            reserva,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar la reserva ' + cod_reserva,
            error,
        });
    }
};

export const deleteReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }

        await reserva.destroy();

        res.json({
            msg: 'Reserva eliminada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al eliminar la reserva ' + cod_reserva,
            error,
        });
    }
};