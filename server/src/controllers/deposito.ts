import { deposito } from '../models/deposito';

// Obtener todos los depósitos
export const getAllDepositos = async (req, res) => {
  try {
    const depositos = await deposito.findAll();
    res.json(depositos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un depósito por su ID
export const getDepositoById = async (req, res) => {
  try {
    const deposito = await deposito.findByPk(req.params.id);
    if (!deposito) {
      return res.status(404).json({ message: 'Depósito no encontrado' });
    }
    res.json(deposito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo depósito
export const createDeposito = async (req, res) => {
  try {
    const { NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
    const nuevoDeposito = await deposito.create({ NOMBRE_BANCO, NUMERO_DE_CUENTA });
    res.status(201).json(nuevoDeposito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un depósito
export const updateDeposito = async (req, res) => {
  try {
    const deposito = await deposito.findByPk(req.params.id);
    if (!deposito) {
      return res.status(404).json({ message: 'Depósito no encontrado' });
    }
    const { NOMBRE_BANCO, NUMERO_DE_CUENTA } = req.body;
    await deposito.update({ NOMBRE_BANCO, NUMERO_DE_CUENTA });
    res.json(deposito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un depósito
export const deleteDeposito = async (req, res) => {
  try {
    const deposito = await deposito.findByPk(req.params.id);
    if (!deposito) {
      return res.status(404).json({ message: 'Depósito no encontrado' });
    }
    await deposito.destroy();
    res.json({ message: 'Depósito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};