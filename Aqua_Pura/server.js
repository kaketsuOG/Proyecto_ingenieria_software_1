const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3306;

app.use(bodyParser.json());
app.use(cors());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'aqua_pura'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a MySQL como ID ' + db.threadId);
});

// Define rutas y controladores aquí...

app.listen(port, () => {
    console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});

app.post('/login', authController.iniciarSesion);
