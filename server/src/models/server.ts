import express, {Application} from 'express';
import cors from 'cors';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesInventario from '../routes/inventario';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import routesSucursal from '../routes/sucursal';
import { Rol } from './rol';
import { User } from './user';
import { Inventario } from './inventario';
import { Producto } from './producto';
import { Vehiculo } from './vehiculo';
import {Sucursal} from './sucursal';

class Server {
    private app: Application;
    private port: string ;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }

    routes(){
        this.app.use('/api/roles',routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/inventario',routesInventario);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/vehiculos', routesVehiculo);
        this.app.use('/api/sucursal',routesSucursal);
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
            

            
            


        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}

export default Server;
