import { transaccion } from '../models/transaccion';
import { pagos } from '../models/pagos';

// Obtener todas las transacciones
export const getAllTransacciones = async (req, res) => {
  try {
    const transacciones = await transaccion.findAll({
      include: [
        { model: pagos, attributes: ['COD_PAGO'] },
      ],
    });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una transacción por su ID
export const getTransaccionById = async (req, res) => {
  try {
    const transaccion = await transaccion.findByPk(req.params.id, {
      include: [
        { model: pagos, attributes: ['COD_PAGO'] },
      ],
    });
    if (!transaccion) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva transacción
export const createTransaccion = async (req, res) => {
  try {
    const { COD_PAGO } = req.body;
    const nuevaTransaccion = await transaccion.create({ COD_PAGO });
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una transacción
export const updateTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion.findByPk(req.params.id);
    if (!transaccion) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    const { ESTADO_TRANSACCION } = req.body;
    await transaccion.update({ ESTADO_TRANSACCION });
    res.json(transaccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una transacción
export const deleteTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion.findByPk(req.params.id);
    if (!transaccion) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    await transaccion.destroy();
    res.json({ message: 'Transacción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};