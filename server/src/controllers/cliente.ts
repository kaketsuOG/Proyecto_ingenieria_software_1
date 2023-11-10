import { Request, Response } from 'express';
import { Cliente } from '../models/cliente';

// Crear un nuevo cliente
export const createCliente = async (req: Request, res: Response) => {
    const { CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO1_CLIENTE, APELLIDO2_CLIENTE, DIRECCION_CLIENTE } = req.body;

    const existingCliente = await Cliente.findOne({ where: { CELULAR_CLIENTE } });

    if (existingCliente) {
        return res.status(400).json({
            msg: 'Ya existe un cliente con ese número de celular'
        });
    }

    try {
        await Cliente.create({
            CELULAR_CLIENTE,
            NOMBRE_CLIENTE,
            APELLIDO1_CLIENTE,
            APELLIDO2_CLIENTE,
            DIRECCION_CLIENTE
        });
        return res.json({
            msg: 'Cliente creado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

// Obtener todos los clientes
export const getClientes = async (req: Request, res: Response) => {
    const clients = await Cliente.findAll({
        attributes: ['CELULAR_CLIENTE', 'NOMBRE_CLIENTE', 'APELLIDO1_CLIENTE', 'APELLIDO2_CLIENTE', 'DIRECCION_CLIENTE']
    });

    res.json(clients);
};

// Obtener un cliente por su número de celular
export const getCliente = async (req: Request, res: Response) => {
    const { CELULAR_CLIENTE } = req.params;
    const client = await Cliente.findOne({ where: { CELULAR_CLIENTE } });

    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular indicado no existe"
        });
    }

    try {
        return res.json(client);
    } catch (error) {
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
};

// Eliminar un cliente por su número de celular
export const deleteCliente = async (req: Request, res: Response) => {
    const { CELULAR_CLIENTE } = req.params;
    const client = await Cliente.findOne({ where: { CELULAR_CLIENTE } });

    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular " + CELULAR_CLIENTE + " no existe"
        });
    }

    try {
        await Cliente.destroy({ where: { CELULAR_CLIENTE } });
        res.json({
            msg: "Se ha eliminado el cliente con número de celular: " + CELULAR_CLIENTE
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el cliente con número de celular: " + CELULAR_CLIENTE,
            error
        });
    }
};

// Actualizar un cliente por su número de celular
export const updateCliente = async (req: Request, res: Response) => {
    const { CELULAR_CLIENTE } = req.params;
    const client = await Cliente.findOne({ where: { CELULAR_CLIENTE } });

    if (!client) {
        return res.status(400).json({
            msg: "El cliente con el número de celular " + CELULAR_CLIENTE + " no existe"
        });
    }

    try {
        const { NOMBRE_CLIENTE, APELLIDO1_CLIENTE, APELLIDO2_CLIENTE, DIRECCION_CLIENTE } = req.body;
        await Cliente.update({
            NOMBRE_CLIENTE,
            APELLIDO1_CLIENTE,
            APELLIDO2_CLIENTE,
            DIRECCION_CLIENTE
        }, { where: { CELULAR_CLIENTE } });

        res.json({
            msg: "Se ha actualizado el cliente con número de celular: " + CELULAR_CLIENTE
        });
    } catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el cliente con número de celular: " + CELULAR_CLIENTE,
            error
        });
    }
};