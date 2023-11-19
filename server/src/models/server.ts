import express, { Application } from 'express';
import cors from 'cors';
import { Rol } from './rol';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesDispo_fecha from '../routes/dispo_fecha';
import routesDet_horario_entrega from '../routes/det_horario_entrega'
import { User } from './user';
import { Disponibilidad_fecha } from './dispo_fecha';
import { Detalle_horario_entrega } from './det_horario_entrega'
import { Producto } from './producto';
import { Vehiculo } from './vehiculo';
import { Cliente } from './cliente';
import { Historial } from './historial';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';


        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/roles', routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/dispo_fechas', routesDispo_fecha);
        this.app.use('/api/det_horario_entrega', routesDet_horario_entrega)
    }

    midlewares() {

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Vehiculo.sync()
            await Rol.sync()
            await User.sync()
            await Producto.sync()
            await Disponibilidad_fecha.sync()
            await Detalle_horario_entrega.sync()
            await Cliente.sync()






        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}

export default Server;
