import { Request, Response } from "express";
import { Reserva } from "../models/reserva";
import { DetalleReserva } from '../models/detalle_reserva';
import { Producto } from "../models/producto";
import sequelize from "sequelize";
import { Op } from "sequelize";
import { createCanvas, CanvasRenderingContext2D } from 'canvas';

const handleErrorResponse = (res: Response, message: string, error: any) => {
    res.status(400).json({
        msg: message,
        error,
    });
};

export const newReserva = async (req: Request, res: Response) => {
    const {
        CELULAR_CLIENTE,
        NOMBRE_CLIENTE,
        APELLIDO_CLIENTE,
        DIRECCION_CLIENTE,
        CIUDAD_CLIENTE,
    } = req.body;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    try {
        const reserva = await Reserva.create({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO_CLIENTE,
            DIRECCION_CLIENTE,
            CIUDAD_CLIENTE,
            FECHA_CREACION: fechaFormateada,
            ESTADO: 'Pendiente',
            TOTAL: 0,
        });

        return res.json({
            msg: 'Reserva creada correctamente',
            reserva,
        });
    } catch (error) {
        handleErrorResponse(res, 'Ocurrió un error al crear la reserva', error);
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
        handleErrorResponse(res, 'Ha ocurrido un error al encontrar la reserva ' + cod_reserva, error);
    }
};

export const getReservas = async (req: Request, res: Response) => {
    try {
        const listReservas = await Reserva.findAll();
        res.json(listReservas);
    } catch (error) {
        handleErrorResponse(res, 'Ha ocurrido un error al obtener las reservas', error);
    }
};

export const updateReserva = async (req: Request, res: Response) => {
    const { cod_reserva } = req.params;
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE, CIUDAD_CLIENTE } = req.body;

    try {
        const reserva = await Reserva.findByPk(cod_reserva);

        if (!reserva) {
            return res.status(400).json({
                msg: 'La reserva no existe',
            });
        }

        await reserva.update({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO_CLIENTE,
            DIRECCION_CLIENTE,
            CIUDAD_CLIENTE,
        });

        res.json({
            msg: 'Reserva actualizada correctamente',
            reserva,
        });
    } catch (error) {
        handleErrorResponse(res, 'Ha ocurrido un error al actualizar la reserva ' + cod_reserva, error);
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
        handleErrorResponse(res, 'Ha ocurrido un error al eliminar la reserva ' + cod_reserva, error);
    }
};

export const getMasVendido = async (req: Request, res: Response) => {
    const {fecha_inicio, fecha_final} = req.body;

    const productos = await DetalleReserva.findAll({attributes: [[sequelize.col('Producto.NOMBRE_PRODUCTO'), 'NOMBRE_PRODUCTO'], 'CANTIDAD'],
        include: [
          {
            model: Reserva,
            where: {
              FECHA_CREACION: {
                [Op.between]: [fecha_inicio,fecha_final],
              },
            },
          },
          {
            model: Producto,
            attributes: [],
          },
        ],
        
      });


    if(!productos || productos.length == 0){
        res.status(400).json({
            msg:'No se han encontrado reservas en ese periodo de tiempo'
        })
    }
    const productosPorNombre: Map<string, number[]> = new Map();

    for (const producto of productos) {
        const nombreProducto = producto.getDataValue('NOMBRE_PRODUCTO');
        const cantidad = producto.getDataValue('CANTIDAD');
        if (productosPorNombre.has(nombreProducto)) {
            productosPorNombre.get(nombreProducto)!.push(cantidad);
        } else {
            productosPorNombre.set(nombreProducto, [cantidad]);
        }
    }
    try {
        if (productosPorNombre.size > 0) {
            let nombreProductoMayorCantidad = '';
            let cantidadMayor = 0;
    
            for (const [nombreProducto, cantidades] of productosPorNombre) {
                const totalCantidad = cantidades.reduce((acc, curr) => acc + curr, 0);
                if (totalCantidad > cantidadMayor) {
                    nombreProductoMayorCantidad = nombreProducto;
                    cantidadMayor = totalCantidad;
                }
            }
            const idProducto = await Producto.findOne({ where: { NOMBRE_PRODUCTO: nombreProductoMayorCantidad } });
            res.json({
                idProducto,
                cantidadMayor
            });
        }
    }catch(error){
        res.status(400).json({
            msg: 'Ha ocurrido un error al obtener el reporte',
            error
        })

    }

}

export const getVentasPorMes = async (req: Request, res: Response) => {
    
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.getFullYear();

    const reservas = await Reserva.findAll({
        attributes: [
            'TOTAL',
            'FECHA_CREACION',
        ],
        where: {
            FECHA_CREACION: {
                [Op.gte]: [fechaFormateada],
                [Op.lte]: [fechaFormateada + 1]
            }
        }
    });

    const reservasPorMes: Map<number, { cantidad: number, total: number }> = new Map();

    for (const reserva of reservas) {
        const fechaReserva = reserva.getDataValue('FECHA_CREACION');
        const mesReserva = parseInt(fechaReserva.slice(5, 7), 10); // Parsear a número
        const total = reserva.getDataValue('TOTAL');

        if (reservasPorMes.has(mesReserva)) {
            const infoMes = reservasPorMes.get(mesReserva)!;
            infoMes.cantidad++;
            infoMes.total += total;
        } else {
            reservasPorMes.set(mesReserva, { cantidad: 1, total: total });
        }
    }

    const meses = Array.from({ length: 12 }, (_, index) => index + 1);
    const ventasPorMesArray = meses.map(mes => ({
        mes,
        cantidadVentas: reservasPorMes.get(mes)?.cantidad || 0,
        totalDinero: reservasPorMes.get(mes)?.total || 0,
    }));

    res.json(ventasPorMesArray);
};