import { Request, Response } from 'express';
import { DetalleReserva } from '../models/detalle_reserva';
import { Reserva } from '../models/reserva';
import { Producto } from '../models/producto';

// Obtener todos los detalles de reserva
export const getDetallesReserva = async (req: Request, res: Response) => {
    try {
        const detallesReserva = await DetalleReserva.findAll({
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_DETALLE_RESERVA', 'CANTIDAD', 'SUBTOTAL']
        });
        res.json(detallesReserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de reserva.' });
    }
};

// Obtener un detalle de reserva por ID
export const getDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva, {
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (detalleReserva) {
            res.json(detalleReserva);
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de reserva.' });
    }
};

// Crear un nuevo detalle de reserva
export const newDetalleReserva = async (req: Request, res: Response) => {
    const { cod_reserva, cod_producto, cantidad } = req.body;
    const idProducto = await Producto.findOne({ attributes: ['PRECIO_PRODUCTO','CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'] , where:{ COD_PRODUCTO: cod_producto }});
    const precioProducto = idProducto?.dataValues.PRECIO_PRODUCTO;
    const subTotal = precioProducto * cantidad
    const idReserva = await Reserva.findOne({attributes: ['TOTAL'],where: {COD_RESERVA:cod_reserva}})
    const total = idReserva?.dataValues.TOTAL

    if (!idProducto) {
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        })
    }

    if (!idReserva) {
        return res.status(400).json({
            msg: "La reserva ingresada no existe"
        })
    }
    if (cantidad == 0){
        return res.status(400).json({
            msg: "Debes ingresar un valor correcto"
        })
    }
    const cantidadInt = parseInt(cantidad, 10);
    const cantidadDisponible = idProducto?.dataValues.CANTIDAD_DISPONIBLE - cantidadInt
    if (cantidadDisponible < 0) {
        return res.status(400).json({
            msg: 'No hay Stock suficiente',
        })
    }

    try {
        await DetalleReserva.create({
            COD_RESERVA: cod_reserva,
            COD_PRODUCTO: cod_producto,
            CANTIDAD: cantidad,
            SUBTOTAL: subTotal
        });

        await Reserva.update({
            TOTAL: total + subTotal
        },
             {where:{ COD_RESERVA: cod_reserva } });

        await Producto.update({
            CANTIDAD_DISPONIBLE: cantidadDisponible
        },
            { where: { COD_PRODUCTO: cod_producto } })

        res.json({
            msg: 'Pedido realizado correctamente'
        })
    }catch(error){
            res.status(400).json({
                msg: "Ha ocurrido un error al hacer el pedido"
            })

        }
    }
// Actualizar un detalle de reserva por ID
export const updateDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    const { cod_reserva, cod_producto, cantidad, subtotal } = req.body;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            await detalleReserva.update({
                COD_RESERVA: cod_reserva,
                COD_PRODUCTO: cod_producto,
                CANTIDAD: cantidad,
                SUBTOTAL: subtotal
            });
            res.json(detalleReserva);
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el detalle de reserva.' });
    }
};

// Eliminar un detalle de reserva por ID
export const deleteDetalleReserva = async (req: Request, res: Response) => {
    const { cod_detalle_reserva } = req.params;
    try {
        const detalleReserva = await DetalleReserva.findByPk(cod_detalle_reserva);
        if (detalleReserva) {
            await detalleReserva.destroy();
            res.json({ mensaje: 'Detalle de reserva eliminado correctamente.' });
        } else {
            res.status(404).json({ error: 'Detalle de reserva no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el detalle de reserva.' });
    }
}
