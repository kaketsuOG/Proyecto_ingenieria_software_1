import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hola', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
});
 
export default sequelize;  


