import express, {Application} from 'express';
import cors from 'cors';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import { Rol } from './rol';
import { User } from './user';

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
    }

    midlewares() {

        //parseo body
        this.app.use(express.json());

        //cors
        this.app.use(cors());

    }

    async dbConnect(){
        try{
            await User.sync()
            await Rol.sync()
        }catch (error){
            console.error('No se ha podido conectar a la base de datoos');
        }
    }
}

export default Server;