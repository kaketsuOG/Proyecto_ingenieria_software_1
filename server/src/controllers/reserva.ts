import { Request, Response } from "express";
import { Reserva } from "../models/reserva";

export const newReserva = async (req: Request, res: Response) => {
    const { celular_cliente, patente_vehiculo, cod_det_estado } = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    try {
        await Reserva.create({
            CELULAR_CLIENTE: celular_cliente,
            PATENTE_COD_VEHICULO: patente_vehiculo,
            COD_DET_ESTADO: cod_det_estado,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 1, // Por defecto, el estado es pendiente (1)
            TOTAL: 0, // Puedes asignar un valor predeterminado o ajustarlo según tu lógica de negocio
        });

        return res.json(
            { msg: 'Reserva creada correctamente' }
        );
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

export const getReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;

    const idReserva = await Reserva.findOne({ where: { COD_RESERVA: cod_reserva } });

    if (!idReserva) {
        return res.status(400).json({
            msg: 'La reserva no existe'
        });
    }

    try {
        res.json(idReserva);
    } catch (error) {
        res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva,
            error
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
            error
        });
    }
};