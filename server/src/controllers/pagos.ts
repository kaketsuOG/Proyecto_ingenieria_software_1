import { pagos } from '../models/pagos';
import { factura } from '../models/factura';
import { metodos_de_pago } from '../models/metodos_de_pago';
import { deposito } from '../models/deposito';

// Obtener todos los pagos
export const getAllPagos = async (req, res) => {
  try {
    const pagos = await pagos.findAll({
      include: [
        { model: factura, attributes: ['COD_FACTURA'] },
        { model: metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
        { model: deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
      ],
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un pago por su ID
export const getPagoById = async (req, res) => {
  try {
    const pago = await pagos.findByPk(req.params.id, {
      include: [
        { model: factura, attributes: ['COD_FACTURA'] },
        { model: metodos_de_pago, attributes: ['TIPO', 'DETALLE'] },
        { model: deposito, attributes: ['NOMBRE_BANCO', 'NUMERO_DE_CUENTA'] },
      ],
    });
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.json(pago);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo pago
export const createPago = async (req, res) => {
  try {
    const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
    const nuevoPago = await pagos.create({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un pago
export const updatePago = async (req, res) => {
  try {
    const pago = await pagos.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    const { COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO } = req.body;
    await pago.update({ COD_FACTURA, COD_METODO_DE_PAGO, COD_BANCO, MONTO_PAGADO, METODO_PAGO, CONFIRMACION_PAGO });
    res.json(pago);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un pago
export const deletePago = async (req, res) => {
  try {
    const pago = await pagos.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    await pago.destroy();
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};