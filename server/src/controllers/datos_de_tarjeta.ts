import { datos_de_tarjeta } from '../models/datos_de_tarjeta';

// Obtener todos los datos de tarjeta
export const getAllDatosTarjeta = async (req, res) => {
  try {
    const datosTarjeta = await datos_de_tarjeta.findAll();
    res.json(datosTarjeta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un dato de tarjeta por su ID
export const getDatoTarjetaById = async (req, res) => {
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(req.params.id);
    if (!datoTarjeta) {
      return res.status(404).json({ message: 'Dato de tarjeta no encontrado' });
    }
    res.json(datoTarjeta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo dato de tarjeta
export const createDatoTarjeta = async (req, res) => {
  try {
    const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
    const nuevoDatoTarjeta = await datos_de_tarjeta.create({ FECHA_DE_VENCIMIENTO, CVC });
    res.status(201).json(nuevoDatoTarjeta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un dato de tarjeta
export const updateDatoTarjeta = async (req, res) => {
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(req.params.id);
    if (!datoTarjeta) {
      return res.status(404).json({ message: 'Dato de tarjeta no encontrado' });
    }
    const { FECHA_DE_VENCIMIENTO, CVC } = req.body;
    await datoTarjeta.update({ FECHA_DE_VENCIMIENTO, CVC });
    res.json(datoTarjeta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un dato de tarjeta
export const deleteDatoTarjeta = async (req, res) => {
  try {
    const datoTarjeta = await datos_de_tarjeta.findByPk(req.params.id);
    if (!datoTarjeta) {
      return res.status(404).json({ message: 'Dato de tarjeta no encontrado' });
    }
    await datoTarjeta.destroy();
    res.json({ message: 'Dato de tarjeta eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};