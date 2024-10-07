const express = require('express'); // Importar el framework Express
const mysql = require('mysql2');    // Importar la librería MySQL para conectarse a MariaDB

const app = express();  // Crear una instancia de la aplicación Express

// Configuración de la conexión a la base de datos MariaDB
const db = mysql.createConnection({
  host: 'marieta',      // Nombre del contenedor de la base de datos (definido en docker-compose)
  user: 'root',         // Usuario de la base de datos
  password: '1234',     // Contraseña del usuario
  database: 'testdb'    // Nombre de la base de datos que desees usar
});

// Conectar a la base de datos y mostrar un mensaje de éxito o error
db.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MariaDB.');
});

// Crear un endpoint de prueba para verificar la conexión
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los datos de la base de datos');
      return;
    }
    res.json(results);  // Devolver los resultados como JSON
  });
});

// Configurar el puerto en el que la aplicación escuchará
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
