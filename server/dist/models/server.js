"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
<<<<<<< HEAD
const roles_1 = __importDefault(require("../routes/roles"));
const user_1 = __importDefault(require("../routes/user"));
const inventario_1 = __importDefault(require("../routes/inventario"));
const producto_1 = __importDefault(require("../routes/producto"));
const vehiculo_1 = __importDefault(require("../routes/vehiculo"));
const sucursal_1 = __importDefault(require("../routes/sucursal"));
const dispo_fecha_1 = __importDefault(require("../routes/dispo_fecha"));
const det_horario_entrega_1 = __importDefault(require("../routes/det_horario_entrega"));
const rol_1 = require("./rol");
const user_2 = require("./user");
const inventario_2 = require("./inventario");
const producto_2 = require("./producto");
const vehiculo_2 = require("./vehiculo");
const sucursal_2 = require("./sucursal");
const dispo_fecha_2 = require("./dispo_fecha");
const det_horario_entrega_2 = require("./det_horario_entrega");
=======
const rol_1 = require("./rol");
const roles_1 = __importDefault(require("../routes/roles"));
const user_1 = require("./user");
const user_2 = __importDefault(require("../routes/user"));
const sucursal_1 = require("./sucursal");
const sucursal_2 = __importDefault(require("../routes/sucursal"));
const inventario_1 = require("./inventario");
const inventario_2 = __importDefault(require("../routes/inventario"));
const producto_1 = require("./producto");
const producto_2 = __importDefault(require("../routes/producto"));
const vehiculo_1 = require("./vehiculo");
const vehiculo_2 = __importDefault(require("../routes/vehiculo"));
const cliente_1 = require("./cliente");
const cliente_2 = __importDefault(require("../routes/cliente"));
const historial_1 = require("./historial");
const historial_2 = __importDefault(require("../routes/historial"));
>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/vehiculos', vehiculo_2.default);
        this.app.use('/api/roles', roles_1.default);
<<<<<<< HEAD
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/inventario', inventario_1.default);
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/vehiculos', vehiculo_1.default);
        this.app.use('/api/sucursal', sucursal_1.default);
        this.app.use('/api/dispo_fechas', dispo_fecha_1.default);
        this.app.use('/api/det_horario_entrega', det_horario_entrega_1.default);
=======
        this.app.use('/api/users', user_2.default);
        this.app.use('/api/sucursal', sucursal_2.default);
        this.app.use('/api/inventario', inventario_2.default);
        this.app.use('/api/productos', producto_2.default);
        this.app.use('/api/cliente', cliente_2.default);
        this.app.use('/api/historial', historial_2.default);
>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield vehiculo_1.Vehiculo.sync();
                yield rol_1.Rol.sync();
<<<<<<< HEAD
                yield user_2.User.sync();
                yield sucursal_2.Sucursal.sync();
                yield inventario_2.Inventario.sync();
                yield producto_2.Producto.sync();
                yield dispo_fecha_2.Disponibilidad_fecha.sync();
                yield det_horario_entrega_2.Detalle_horario_entrega.sync();
=======
                yield user_1.User.sync();
                yield sucursal_1.Sucursal.sync();
                yield inventario_1.Inventario.sync();
                yield producto_1.Producto.sync();
                yield cliente_1.Cliente.sync();
                yield historial_1.Historial.sync();
>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57
            }
            catch (error) {
                console.error('No se ha podido conectar a la base de datos');
            }
        });
    }
}
exports.default = Server;
