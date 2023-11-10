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
const rol_1 = require("./rol");
const roles_1 = __importDefault(require("../routes/roles"));
const user_1 = __importDefault(require("../routes/user"));
const producto_1 = __importDefault(require("../routes/producto"));
const vehiculo_1 = __importDefault(require("../routes/vehiculo"));
const dispo_fecha_1 = __importDefault(require("../routes/dispo_fecha"));
const det_horario_entrega_1 = __importDefault(require("../routes/det_horario_entrega"));
const user_2 = require("./user");
const dispo_fecha_2 = require("./dispo_fecha");
const det_horario_entrega_2 = require("./det_horario_entrega");
const producto_2 = require("./producto");
const vehiculo_2 = require("./vehiculo");
const cliente_1 = require("./cliente");
const historial_1 = require("./historial");
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
        this.app.use('/api/vehiculos', vehiculo_1.default);
        this.app.use('/api/roles', roles_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/vehiculos', vehiculo_1.default);
        this.app.use('/api/dispo_fechas', dispo_fecha_1.default);
        this.app.use('/api/det_horario_entrega', det_horario_entrega_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield vehiculo_2.Vehiculo.sync();
                yield rol_1.Rol.sync();
                yield user_2.User.sync();
                yield producto_2.Producto.sync();
                yield dispo_fecha_2.Disponibilidad_fecha.sync();
                yield det_horario_entrega_2.Detalle_horario_entrega.sync();
                yield cliente_1.Cliente.sync();
                yield historial_1.Historial.sync();
            }
            catch (error) {
                console.error('No se ha podido conectar a la base de datos');
            }
        });
    }
}
exports.default = Server;
