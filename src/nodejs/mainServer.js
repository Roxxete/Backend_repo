const express = require('express');
const mysql = require('mysql2');

// Crear una aplicación Express
const app = express();
const port = 8080;

// Configurar la conexión a la base de datos MariaDB
const db = mysql.createConnection({
  host: 'marieta', // Nombre del servicio del contenedor MariaDB
  user: 'root',
  password: '1234', // La misma contraseña que definiste en docker-compose.yml
  database: 'PROBANDOKV'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MariaDB');
  }
});

// Ruta para obtener los datos de la tabla key_value
app.get('/api/values', (req, res) => {
  const query = 'SELECT * FROM key_value';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(results);
    }
  });
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
