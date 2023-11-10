import express, { Application } from 'express';
import cors from 'cors';
import { Rol } from './rol';
import routesRoles from '../routes/roles';
<<<<<<< HEAD
import routesUser from '../routes/user';
import routesInventario from '../routes/inventario';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesSucursal from '../routes/sucursal';
import routesDispo_fecha from '../routes/dispo_fecha';
import routesDet_horario_entrega from '../routes/det_horario_entrega'
import { Rol } from './rol';
=======
>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57
import { User } from './user';
import routesUser from '../routes/user';
import { Sucursal } from './sucursal';
<<<<<<< HEAD
import { Disponibilidad_fecha } from './dispo_fecha';
import { Detalle_horario_entrega } from './det_horario_entrega'
=======
import routesSucursal from '../routes/sucursal';
import { Inventario } from './inventario';
import routesInventario from '../routes/inventario';
import { Producto } from './producto';
import routesProducto from '../routes/producto';
import { Vehiculo } from './vehiculo';
import routesVehiculo from '../routes/vehiculo';
import { Cliente } from './cliente';
import routesCliente from '../routes/cliente';
import { Historial } from './historial';
import routesHistorial from '../routes/historial';






>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57


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
<<<<<<< HEAD
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/dispo_fechas', routesDispo_fecha);
        this.app.use('/api/det_horario_entrega', routesDet_horario_entrega)
=======
        this.app.use('/api/cliente', routesCliente);
        this.app.use('/api/historial', routesHistorial);


>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57
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
<<<<<<< HEAD
            await Disponibilidad_fecha.sync()
            await Detalle_horario_entrega.sync()

=======
            await Cliente.sync()
            await Historial.sync()
>>>>>>> 4500967e0e888fc8a1c5d49772043cbc1ee12f57





        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}

export default Server;
