import express, {Application} from 'express';
import cors from 'cors';
import {Rol } from './rol';
import routesRoles from '../routes/roles';
import { User } from './user';
import routesUser from '../routes/user';
import {Sucursal} from './sucursal';
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








class Server {
    private app: Application;
    private port: string ;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';


        this.midlewares();
        this.listen();
        this.dbConnect();
        this.routes();

        
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }

    routes(){
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/roles',routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/sucursal',routesSucursal);
        this.app.use('/api/inventario',routesInventario);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/cliente', routesCliente);
        this.app.use('/api/historial', routesHistorial);
        
        
    }

    midlewares() {

        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Vehiculo.sync()
            await Rol.sync()
            await User.sync()
            await Sucursal.sync()
            await Inventario.sync()
            await Producto.sync()
            await Cliente.sync()
            await Historial.sync()

            
            


        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}

export default Server;
