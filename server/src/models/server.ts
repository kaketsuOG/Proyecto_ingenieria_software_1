import express, {Application} from 'express';
import cors from 'cors';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routesInventario from '../routes/inventario';
import routesProducto from '../routes/producto';
import routesVehiculo from '../routes/vehiculo';
import { Rol } from './rol';
import { User } from './user';
import { Inventario } from './inventario';
import { Producto } from './producto';
import { Vehiculo } from './vehiculo';

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
            console.log('Corriendo en el puertoo ' + this.port);
        })
    }

    routes(){
        this.app.use('/api/roles',routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/inventraio',routesInventario);
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/vehiculos', routesVehiculo);
    }

    midlewares() {
        //parseo body
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Inventario.sync()
            await Producto.sync()
            await User.sync()
            await Rol.sync()
            await Vehiculo.sync()
        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}

export default Server;
