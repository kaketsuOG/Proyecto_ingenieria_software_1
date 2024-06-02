import express, { Application } from 'express';
import cors from 'cors';
import { Rol } from './rol';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesReserva from '../routes/reserva';
import routesDet_reserva from '../routes/detalle_reserva';
import metodosRoutes from './routes/metodos_de_pago';
import depositosRoutes from './routes/deposito';
import tarjetasRoutes from './routes/datos_de_tarjeta';
import pagosRoutes from './routes/pagos';
import transaccionesRoutes from './routes/transaccion';
import { User } from './user';
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
        this.app.use('/api/reserva', routesReserva);
        this.app.use('/api/det_reserva_producto', routesDet_reserva);
        this.app.use('/api/metodo', RoutesMetodo);
        this.app.use('/api/deposito', RoutesDeposito);
        this.app.use('/api/tarjeta', RoutesTarjeta);
        this.app.use('/api/pago', RoutesPago);
        this.app.use('/api/transacciones', RoutesTransacciones);
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
