
const mariadb = require('mariadb');

console.log( " creando pool " )
// Create a connection pool
const pool = mariadb.createPool({
  //host: 'localhost',  // Database host SI FUERA DE CONTENEDOR, i.e. en el ordenador físico
  host: 'marieta',  // SI DENTRO DE OTRO CONTENEDOR
  user: 'root',  // Database username
  password: '1234',  // Database password
  database: 'PROBANDOKV',  // Your database name
  connectionLimit: 5  // Limit for simultaneous connections
});


process.on( "SIGINT", function() {
    console.log( " ctl-C detectado " )

    process.exit()

})

// Async function to query the database
async function queryDatabase() {
  let connection;
  try {

    console.log( " connectando ... " )
    // Get a connection from the pool
    connection = await pool.getConnection();
    console.log( " .... hecho " )

    // Issue a SELECT query
    const rows = await connection.query('SELECT * FROM key_value');

    // Output the result
    console.log(rows);

  } catch (err) {
    console.error('Error: ', err);
  } finally {

    console.log( " finally: liberando conexion " )
    // Release the connection back to the pool
    if (connection) {
      connection.release()
    } 
    console.log ( " fin del finally " )
    //
  } // finally
} // ()

// Execute the function
queryDatabase();

