import { Request, Response } from 'express';
import { Detalle_reserva_producto } from '../models/det_reserva_producto'; // Asegúrate de tener la ruta correcta
import { Reserva } from '../models/reserva'; // Asegúrate de tener la ruta correcta
import { Producto } from '../models/producto'; // Asegúrate de tener la ruta correcta

// Obtener todos los pedidos
export const getPedidos = async (req: Request, res: Response) => {
    try {
        const pedidos = await Detalle_reserva_producto.findAll({
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ],
            attributes: ['COD_PEDIDO', 'CANTIDAD']
        });
        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos.' });
    }
};

// Obtener un pedido por ID
export const getPedido = async (req: Request, res: Response) => {
    const { cod_pedido } = req.params;
    try {
        const pedido = await Detalle_reserva_producto.findByPk(cod_pedido, {
            include: [
                { model: Reserva, attributes: ['COD_RESERVA'] },
                { model: Producto, attributes: ['COD_PRODUCTO'] }
            ]
        });
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pedido.' });
    }
};

// Crear un nuevo pedido
export const newPedido = async (req: Request, res: Response) => {
    const { cod_producto, cod_reserva, cantidad } = req.body;
    try {
        const pedidoCreado = await Detalle_reserva_producto.create({
            COD_PRODUCTO: cod_producto,
            COD_RESERVA: cod_reserva,
            CANTIDAD: cantidad
        });
        res.json(pedidoCreado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el pedido.' });
    }
};

// Actualizar un pedido por ID
export const updatePedido = async (req: Request, res: Response) => {
    const { cod_pedido } = req.params;
    const { cod_producto, cod_reserva, cantidad } = req.body;
    try {
        const pedido = await Detalle_reserva_producto.findByPk(cod_pedido);
        if (pedido) {
            await pedido.update({
                COD_PRODUCTO: cod_producto,
                COD_RESERVA: cod_reserva,
                CANTIDAD: cantidad
            });
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el pedido.' });
    }
};

// Eliminar un pedido por ID
export const deletePedido = async (req: Request, res: Response) => {
    const { cod_pedido } = req.params;
    try {
        const pedido = await Detalle_reserva_producto.findByPk(cod_pedido);
        if (pedido) {
            await pedido.destroy();
            res.json({ mensaje: 'Pedido eliminado correctamente.' });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pedido.' });
    }
};