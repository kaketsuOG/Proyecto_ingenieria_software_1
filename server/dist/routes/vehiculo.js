"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculo_1 = require("../controllers/vehiculo");
const validate_token_1 = __importDefault(require("./validate-token")); // Importa el middleware de validación de token
const router = (0, express_1.Router)();
// Ruta para crear un nuevo vehículo (requiere token)
router.post('/', validate_token_1.default, vehiculo_1.newVehiculo);
// Ruta para obtener la lista de vehículos (requiere token)
router.get('/list', validate_token_1.default, vehiculo_1.getVehiculos);
// Ruta para obtener un vehículo por su patente (requiere token)
router.get('/:patente_cod_vehiculo', validate_token_1.default, vehiculo_1.getVehiculo);
// Ruta para eliminar un vehículo por su patente (requiere token)
router.delete('/:patente_cod_vehiculo', validate_token_1.default, vehiculo_1.deleteVehiculo);
// Ruta para actualizar los datos de un vehículo por su patente (requiere token)
router.put('/:patente_cod_vehiculo', validate_token_1.default, vehiculo_1.updateVehiculo);
exports.default = router;
