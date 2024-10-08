const express = require('express');
const mysql = require('mysql2');

// Crear una aplicación Express
const app = express();
const port = 8080;

// Crear un pool de conexiones a la base de datos MariaDB
const db = mysql.createPool({
  host: 'marieta', // Nombre del servicio del contenedor MariaDB
  user: 'root',
  password: '1234', // La misma contraseña que definiste en docker-compose.yml
  database: 'PROBANDOKV',
  waitForConnections: true, // Esperar a que haya una conexión disponible
  connectionLimit: 10, // Límite de conexiones en el pool
  queueLimit: 0 // Sin límite de cola
});

// Verificar la conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MariaDB');
  connection.release(); // Liberar la conexión de prueba
});

// Ruta para obtener los datos de la tabla key_value
app.get('/api/values', (req, res) => {
  const query = 'SELECT * FROM key_value';

  // Usar una conexión del pool para ejecutar la consulta
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).send('Error en el servidor');
    }
    res.json(results);
  });
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando correctamente');
});

// Ruta para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
