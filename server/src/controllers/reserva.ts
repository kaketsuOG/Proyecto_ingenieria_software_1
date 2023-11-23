import { Request, Response } from "express";
import { Reserva } from "../models/reserva";
import { where } from "sequelize";

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

export const getReserva = async(req:Request,res:Response)=>{
    const {cod_reserva} = req.params;

    const idReserva = await Reserva.findOne({where:{COD_RESERVA: cod_reserva}})

    if(!idReserva){
        return res.status(400).json({
            msg: 'La reserva no existe'
        })
    }
    try{
        res.json(idReserva)
    }catch (error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar la reserva '+cod_reserva,
            error
        })
    }

}

export const getReservas = async(req:Request,res:Response)=>{
    const listReservas = await Reserva.findAll()
    res.json(listReservas)
}