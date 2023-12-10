import express, { Application } from 'express';
import cors from 'cors';
import { Rol } from './rol';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesDispo_fecha from '../routes/dispo_fecha';
import routesDet_horario_entrega from '../routes/det_horario_entrega';
import routesReserva from '../routes/reserva';
import routesDet_reserva from '../routes/detalle_reserva';
import { User } from './user';
import { Disponibilidad_fecha } from './dispo_fecha';
import { Detalle_horario_entrega } from './det_horario_entrega'
import { Producto } from './producto';
import { Vehiculo } from './vehiculo';
import { Reserva } from './reserva';
import { DetalleReserva } from './detalle_reserva';
import { comprobarEstadoReserva} from '../controllers/reserva';
import { firstSteps } from '../controllers/user';



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
        this.startReservaStateCheck()
        // this.firstUser()


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
        this.app.use('/api/det_horario_entrega', routesDet_horario_entrega);
        this.app.use('/api/reserva', routesReserva);
        this.app.use('/api/det_reserva_producto', routesDet_reserva);
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
            await Detalle_horario_entrega.sync()
            await Disponibilidad_fecha.sync()
            await Reserva.sync()
            await DetalleReserva.sync()

        } catch (error) {
            console.error('No se ha podido conectar a la base de datos');
        }
    }

    async firstUser (){
        try{
            await firstSteps()
        } catch (error){
            console.error('Ha ocurrido un error en el servidor',error);

        }
    }
    async startReservaStateCheck() {
        setInterval(async () => {
          try {
            comprobarEstadoReserva()
            
          } catch (error) {
            console.error('Ha ocurrido un error en el servidor',error);
          }
        }, 1500000);
      }
}
export default Server;
