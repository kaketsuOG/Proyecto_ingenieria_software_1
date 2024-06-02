import { metodos_de_pago } from '../models/metodos_de_pago';

// Obtener todos los métodos de pago
export const getAllMetodos = async (req, res) => {
  try {
    const metodos = await metodos_de_pago.findAll();
    res.json(metodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un método de pago por su ID
export const getMetodoById = async (req, res) => {
  try {
    const metodo = await metodos_de_pago.findByPk(req.params.id);
    if (!metodo) {
      return res.status(404).json({ message: 'Método de pago no encontrado' });
    }
    res.json(metodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo método de pago
export const createMetodo = async (req, res) => {
  try {
    const { TIPO, DETALLE } = req.body;
    const nuevoMetodo = await metodos_de_pago.create({ TIPO, DETALLE });
    res.status(201).json(nuevoMetodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un método de pago
export const updateMetodo = async (req, res) => {
  try {
    const metodo = await metodos_de_pago.findByPk(req.params.id);
    if (!metodo) {
      return res.status(404).json({ message: 'Método de pago no encontrado' });
    }
    const { TIPO, DETALLE } = req.body;
    await metodo.update({ TIPO, DETALLE });
    res.json(metodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un método de pago
export const deleteMetodo = async (req, res) => {
  try {
    const metodo = await metodos_de_pago.findByPk(req.params.id);
    if (!metodo) {
      return res.status(404).json({ message: 'Método de pago no encontrado' });
    }
    await metodo.destroy();
    res.json({ message: 'Método de pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};