// controllers/authController.js

const mysql = require('mysql');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'aqua_front'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a MySQL como ID ' + db.threadId);
});

// Función para manejar el inicio de sesión
exports.iniciarSesion = (req, res) => {

    console.log(req)

    const { usuario, contraseña } = req.body;

    // Realiza una consulta a la base de datos para verificar las credenciales
    const query = 'SELECT * FROM USUARIO WHERE RUT_USUARIO = ? AND CONTRASEÑA = ?';

    db.query(query, [usuario, contraseña], (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }

        if (results.length === 1) {
            // Usuario autenticado correctamente
            res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });

};