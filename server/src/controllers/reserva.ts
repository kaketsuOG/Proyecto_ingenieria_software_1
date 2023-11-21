import { Request, Response } from "express";
import { Reserva } from "../models/reserva";

export const newReserva = async(req:Request,res:Response) =>{
    const {celular_cliente,patente_vehiculo,cod_det_estado,cod_disponibilidad} = req.body;
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    try{
        await Reserva.create({
            CELULAR_CLIENTE: celular_cliente,
            COD_DISPONIBILIDAD: cod_disponibilidad,
            PATENTE_VEHICULO: patente_vehiculo,
            COD_DET_ESTADO: cod_det_estado,
            FECHA_CREACION: fechaFormateada
        });
        console.log(fechaFormateada)
        return res.json(
           { msg: 'Reserva creado correctamente'}
        );

    }catch (error){
        res.status(400).json({
            msg:'Ocurrio un error',
            error
        })

    }
}