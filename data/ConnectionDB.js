const { Client } = require('pg');

class ConnectionDB {
  async connect() {
    try {
      const connection = new Client({
        user: "postgres",
        password: "123",  
        host: "localhost",
        port: 5432,   
        database: "EDUPLANPRO"
      });
      // Conexión a la base de datos
      await connection.connect();
      console.log("Conexión exitosa a la base de datos");
    } catch (error) {
      console.error(`Error de conexión: ${error}`);
    }
  }
}

// Exportamos el método connect
module.exports = new ConnectionDB().connect;
